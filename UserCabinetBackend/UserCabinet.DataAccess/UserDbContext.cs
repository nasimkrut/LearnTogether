using Microsoft.EntityFrameworkCore;
using UserCabinet.DataAccess.Entites;

namespace UserCabinet.DataAccess;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<UserEntity> Users { get; set; }
}