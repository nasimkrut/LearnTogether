using Microsoft.EntityFrameworkCore;
using UserCabinet.Core.Models;
using UserCabinet.DataAccess.Entites;


namespace UserCabinet.DataAccess.Repositories;

public class UsersRepository(UserDbContext context) : IUsersRepository
{
    private readonly UserDbContext _context = context;

    public async Task<List<User>> Get()
    {
        var userEntities = await _context.Users
            .AsNoTracking()
            .ToListAsync();

        var users = userEntities
            .Select(b => User.Create(b.Id, b.Name, b.Email, b.Password, b.AvatarUrl, b.Rating, b.Role).user)
            .ToList();

        return users;
    }

    public async Task<Guid> Create(User user)
    {
        var UserEntity = new UserEntity
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            Password = user.Password,
            Rating = user.Rating,
            Role = user.Role,
        };

        await _context.Users.AddAsync(UserEntity);
        await _context.SaveChangesAsync();

        return user.Id;
    }

    public async Task<Guid> Update(Guid id, string name, string email, string password, string avatarUrl, double rating,
        string role)
    {
        _context.Users
            .Where(b => b.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(b => b.Name, b => name)
                .SetProperty(b => b.Email, b => email)
                .SetProperty(b => b.Password, b => password)
                .SetProperty(b => b.AvatarUrl, b => avatarUrl)
                .SetProperty(b => b.Rating, b => rating)
                .SetProperty(b => b.Role, b => role));

        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Users
            .Where(b => b.Id == id)
            .ExecuteDeleteAsync();

        return id;
    }
}