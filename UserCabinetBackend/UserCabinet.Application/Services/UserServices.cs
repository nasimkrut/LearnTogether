using UserCabinet.Core.Models;
using UserCabinet.DataAccess.Repositories;

namespace UserCabinet.Application.Services;

public class UserServices : IUserServices
{
    private readonly IUsersRepository _usersRepository;
    
    public UserServices(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    public async Task<List<User>> GetAllUsers()
    {
        return await _usersRepository.Get();
    }
    
    public async Task<Guid> CreateUser(User user)
    {
        return await _usersRepository.Create(user);
    }
    
    public async Task<Guid> UpdateUser(Guid id, string name, string email, string password, string avatarUrl, double rating, string role)
    {
        return await _usersRepository.Update(id, name, email, password, avatarUrl, rating, role);
    }
    
    public async Task<Guid> DeleteUser(Guid id)
    {
        return await _usersRepository.Delete(id);
    }
}