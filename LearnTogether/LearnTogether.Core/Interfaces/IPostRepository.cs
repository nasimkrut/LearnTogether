using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IPostRepository
{
    Task<Post> GetByIdAsync(Guid id);
    Task<List<Post>> GetAllAsync();
    Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, string sortBy);
    Task AddAsync(Post post);
    Task<Guid> UpdateAsync(Guid id, Subject? requiredSubject, Subject[] helpSubjects, string description,
        List<string> tags);
    Task DeleteAsync(Guid id);
}