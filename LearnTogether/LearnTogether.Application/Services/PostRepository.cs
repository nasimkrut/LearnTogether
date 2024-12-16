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

    public async Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, SortType sortBy)
    {
        var query = _context.Posts.AsQueryable();

        if (requiredSubject.HasValue)
            query = query.Where(post => post.HelpSubjects.Contains(requiredSubject.Value));

        if (helpSubjects.Length > 0)
            query = query.Where(post => helpSubjects.Any(s => post.RequiredSubject == s));

        if (minRating.HasValue)
            query = query.Where(post => post.Rating >= minRating.Value);

        query = sortBy switch
        {
            SortType.New => query.OrderByDescending(p => p.DateCreated),
            SortType.Old => query.OrderBy(p => p.DateCreated),
            SortType.RatingMinToMax => query.OrderBy(p => p.Rating),
            SortType.RatingMaxToMin => query.OrderByDescending(p => p.Rating),
            _ => query
        };

        return await query.ToListAsync();
    }


    public async Task AddAsync(Post post)
    {
        var user = await _context.Users.FindAsync(post.UserId);
        if (user == null)
        {
            throw new InvalidOperationException("User not found.");
        }
    
        post.User = user;
    
        _context.Posts.Add(post);
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