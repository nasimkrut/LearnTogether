using LearnTogether.Core.Entities;
using LearnTogether.Core.Interfaces;

namespace LearnTogether.Application.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;

    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }

    public async Task<Post> GetPostByIdAsync(Guid id)
    {
        return await _postRepository.GetByIdAsync(id);
    }

    public async Task<List<Post>> GetAllPostAsync()
    {
        return await _postRepository.GetAllAsync();
    }

    public async Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, string sortBy)
    {
        return await _postRepository.GetFilteredPostsAsync(requiredSubject, helpSubjects, minRating, sortBy);
    }

    public async Task AddPostAsync(Post post)
    {
        await _postRepository.AddAsync(post);
    }

    public async Task<Guid> UpdatePostAsync(Guid id, Subject? requiredSubject, Subject[] helpSubjects, string description, List<string> tags)
    {
        return await _postRepository.UpdateAsync(id, requiredSubject, helpSubjects, description, tags);
    }

    public async Task DeletePostAsync(Guid id)
    {
        await _postRepository.DeleteAsync(id);
    }
}