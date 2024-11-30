using LearnTogether.Core.Entities;

namespace LearnTogether.Core.Interfaces;

public interface IPostService
{
    Task<Post> GetPostByIdAsync(Guid id);
    Task<List<Post>> GetAllPostAsync();
    Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, string sortBy);
    Task AddPostAsync(Post post);
    Task<Guid> UpdatePostAsync(Guid id, Subject? requiredSubject, Subject[] helpSubjects, string description,
        List<string> tags);
    Task DeletePostAsync(Guid id);
}