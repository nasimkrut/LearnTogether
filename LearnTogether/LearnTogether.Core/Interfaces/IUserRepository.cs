using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByEmailAsync(string email);
    Task AddUserAsync(User user);
        
    Task<Guid> UpdateUser(Guid id, string username, string email, string password);
        
    Task<Guid> DeleteUser(Guid id);
}