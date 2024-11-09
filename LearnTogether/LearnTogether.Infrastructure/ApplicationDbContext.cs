using LearnTogether.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}