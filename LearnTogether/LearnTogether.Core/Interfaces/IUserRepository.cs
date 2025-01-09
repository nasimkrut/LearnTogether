using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByUserNameAsync(string userName);
    Task<User> GetUserByUserIdAsync(Guid userId);
    Task AddUserAsync(User user);
        
    Task<Guid> UpdateUser(Guid id, string username, string telegramName, Guid telegramChatId, string fullName, string password, double rating, string description);
        
    Task<Guid> DeleteUser(Guid id);
}