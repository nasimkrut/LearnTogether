using UserCabinet.Core.Models;

namespace UserCabinet.DataAccess.Repositories;

public interface IUsersRepository
{
    Task<List<User>> Get();
    Task<Guid> Create(User user);

    Task<Guid> Update(Guid id, string name, string email, string password, string avatarUrl, double rating,
        string role);

    Task<Guid> Delete(Guid id);
}