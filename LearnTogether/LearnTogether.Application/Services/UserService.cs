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

    public async Task<Guid> GetUserIdByUserNameAsync(string userName)
    {
        var user = await _userRepository.GetUserByUserNameAsync(userName);
        return user.Id;
    }

    public async Task<User> GetUserByUserId(Guid userId)
    {
        return await _userRepository.GetUserByUserIdAsync(userId);
    }
    
    public async Task<User> GetUserByUserName(string userName)
    {
        return await _userRepository.GetUserByUserNameAsync(userName);
    }

    public async Task<bool> RegisterUserAsync(User user)
    {
        var existingUser = await _userRepository.GetUserByUserNameAsync(user.UserName);
        if (existingUser != null)
            return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash); 
        await _userRepository.AddUserAsync(user);
        return true;
    }

    public async Task<User> AuthenticateAsync(string userName, string password)
    {
        var user = await _userRepository.GetUserByUserNameAsync(userName);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return user;
    }

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = "oLJq@9XnC!h*H4nCz#^b1W~nKJg%Mj@5^rSz6w@p"u8.ToArray();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<Guid> UpdateUserAsync(Guid id, string username, string fullName, string password, double rating, string description)
    {
        return await _userRepository.UpdateUser(id, username, fullName, password, rating, description);
    }


    public async Task<Guid> DeleteUserAsync(Guid id)
    {
        return await _userRepository.DeleteUser(id);
    }
}