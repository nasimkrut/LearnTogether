using LearnTogether.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    
    public DbSet<Post> Posts { get; set; }

    //scaffold
    //поддережка базы данных
    //GET /api/post/filtered-and-sorted?requiredSubject=Math&helpSubjects=Math&minRating=4.0&sortBy=рейтинг выше
}