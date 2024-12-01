using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByUserNameAsync(string userName);
    Task AddUserAsync(User user);
        
    Task<Guid> UpdateUser(Guid id, string username, string fullName, string password, double rating);
        
    Task<Guid> DeleteUser(Guid id);
}