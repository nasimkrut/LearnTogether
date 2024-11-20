using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LearnTogether.Core.Entities;
using LearnTogether.Core.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace LearnTogether.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> RegisterUserAsync(User user)
    {
        var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
        if (existingUser != null)
            return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash); 
        await _userRepository.AddUserAsync(user);
        return true;
    }

    public async Task<User> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return user;
    }

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = "Your_Secret_Key_Here"u8.ToArray();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<Guid> UpdateUserAsync(Guid id, string username, string email, string password, double rating)
    {
        return await _userRepository.UpdateUser(id, username, email, password, rating);
    }


    public async Task<Guid> DeleteUserAsync(Guid id)
    {
        return await _userRepository.DeleteUser(id);
    }
}