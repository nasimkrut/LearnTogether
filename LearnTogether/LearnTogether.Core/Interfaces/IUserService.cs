using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IUserService
{
    Task<bool> RegisterUserAsync(User user);
        
    Task<User> AuthenticateAsync(string email, string password);
        
    string GenerateJwtToken(User user);
    
    Task<Guid> UpdateUserAsync(Guid id, string username, string email, string password, double rating);
    
    Task<Guid> DeleteUserAsync(Guid id);
}