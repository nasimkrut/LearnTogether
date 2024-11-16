using LearnTogether.Core.Entities;
using LearnTogether.Core.Interfaces;
using LearnTogether.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Application.Services;

public class PostRepository : IPostRepository
{
    private readonly ApplicationDbContext _context;

    public PostRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Post> GetByIdAsync(Guid id)
    {
        return await _context.Posts.FindAsync(id);
    }

    public async Task<List<Post>> GetAllAsync()
    {
        return await _context.Posts.ToListAsync();
    }

    public async Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, string sortBy)
    {
        var query = _context.Posts.AsQueryable();

        if (requiredSubject.HasValue)
            query = query.Where(post => post.RequiredSubject == requiredSubject);

        if (helpSubjects.Length > 0)
            query = query.Where(p => p.HelpSubjects.Any(helpSubjects.Contains));

        if (minRating.HasValue)
            query = query.Where(post => post.Rating >= minRating.Value);

        query = sortBy.ToLower() switch
        {
            "новые" => query.OrderBy(p => p.Datecreated),
            "старые" => query.OrderByDescending(p => p.Datecreated),
            "рейтинг выше" => query.OrderBy(p => p.Rating),
            "рейтинг ниже" => query.OrderByDescending(p => p.Rating),
            _ => query
        };

        return await query.ToListAsync();
    }


    public async Task AddAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    public async Task<Guid> UpdateAsync(Guid id, Subject? requiredSubject, Subject[] helpSubjects, string description,
        List<string> tags)
    {
        await _context.Posts.Where(b => b.Id == id).ExecuteUpdateAsync(s => s
            .SetProperty(b => b.RequiredSubject, b => requiredSubject)
            .SetProperty(b => b.Description, b => description)
            .SetProperty(b => b.HelpSubjects, b => helpSubjects)
            .SetProperty(b => b.Tags, b => tags));

        return id;
    }
    public async Task DeleteAsync(Guid id)
    {
        var post = await GetByIdAsync(id);
        if (post != null)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }
}