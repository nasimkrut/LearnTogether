using UserCabinet.Core.Models;

namespace UserCabinet.Application.Services;

public interface IUserServices
{
    Task<List<User>> GetAllUsers();
    Task<Guid> CreateUser(User user);
    Task<Guid> UpdateUser(Guid id, string name, string email, string password, string avatarUrl, double rating, string role);
    Task<Guid> DeleteUser(Guid id);
}