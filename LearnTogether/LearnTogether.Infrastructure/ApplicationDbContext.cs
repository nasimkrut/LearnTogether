using LearnTogether.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    //scaffold
    //поддережка базы данных
    //
}