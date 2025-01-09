using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LearnTogether.Core.Interfaces;
using LearnTogether.Infrastructure;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Telegram.Bot.Types;
using User = LearnTogether.Core.Entities.User;

namespace LearnTogether.Application.Services;

public class UserService(IUserRepository userRepository, IOptions<JwtOptions> jwtOptions) : IUserService
{
    public async Task<Guid> GetUserIdByUserNameAsync(string userName)
    {
        var user = await userRepository.GetUserByUserNameAsync(userName);
        return user.Id;
    }

    public async Task<User> GetUserByUserId(Guid userId)
    {
        return await userRepository.GetUserByUserIdAsync(userId);
    }
    
    public async Task<User> GetUserByUserName(string userName)
    {
        return await userRepository.GetUserByUserNameAsync(userName);
    }

    public async Task<Guid> UpdateUserAsync(Guid id, string username, string telegramName, ChatId telegramChatId, string avatarUrl,
        string fullName, string password, double rating, string description)
    {
        return await userRepository.UpdateUser(id, username, telegramName, telegramChatId, avatarUrl, fullName, password, rating, description);
    }

    public async Task<bool> RegisterUserAsync(User user)
    {
        var existingUser = await userRepository.GetUserByUserNameAsync(user.UserName);
        if (existingUser != null)
            return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash); 
        await userRepository.AddUserAsync(user);
        return true;
    }

    public async Task<User> AuthenticateAsync(string userName, string password)
    {
        var user = await userRepository.GetUserByUserNameAsync(userName);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return user;
    }

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(ClaimTypes.Name, user.UserName),
            }),
            Expires = DateTime.UtcNow.AddHours(jwtOptions.Value.ExpiresHours),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Value.SecretKey)),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<Guid> DeleteUserAsync(Guid id)
    {
        return await userRepository.DeleteUser(id);
    }

    public async Task<Guid> UpdateUserTelegramAsync(Guid userId, string telegramName, ChatId telegramChatId)
    {
        return await userRepository.UpdateUserTelegram(userId, telegramName, telegramChatId);
    }
}