using LearnTogether.Core.Entities;
using LearnTogether.Core.Interfaces;

namespace LearnTogether.Application.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly ISubscriptionService _subscriptionService;

    public PostService(IPostRepository postRepository, ISubscriptionRepository subscriptionRepository, ISubscriptionService subscriptionService)
    {
        _postRepository = postRepository;
        _subscriptionRepository = subscriptionRepository;
        _subscriptionService = subscriptionService;
    }

    public async Task<Post> GetPostByIdAsync(Guid id)
    {
        return await _postRepository.GetByIdAsync(id);
    }

    public async Task<List<Post>> GetAllPostAsync()
    {
        return await _postRepository.GetAllAsync();
    }

    public async Task<List<Post>> GetFilteredPostsAsync(Subject? requiredSubject, Subject[] helpSubjects, double? minRating, SortType sortBy)
    {
        return await _postRepository.GetFilteredPostsAsync(requiredSubject, helpSubjects, minRating, sortBy);
    }

    public async Task AddPostAsync(Post post)
    {
        await _postRepository.AddAsync(post);

        await NotifySubscribers(post);
    }

    private async Task NotifySubscribers(Post post)
    {
        var userSubscriptions = await _subscriptionRepository
            .GetSubscriptionsByUserId(post.UserId);

        foreach (var subscription in userSubscriptions)
        {
            await SendNotification(subscription, 
                $"Вот эта капибара по имени {post.User.UserName} добавил(а) пост");
        }

        var subjectSubscriptions = await _subscriptionRepository
            .GetSubscriptionsBySubjects(post.HelpSubjects);

        foreach (var subscription in subjectSubscriptions)
        {
            await SendNotification(subscription, 
                $"Добавили пост, где могут помочь по нужным тебе предметам бро");
        }
    }

    private async Task SendNotification(Subscription subscription, string message)
    {
        switch (subscription.NotificationMethod)
        {
            case "Email":
                await _subscriptionService.SendEmailNotification(subscription.UserId.ToString(), message);
                break;
            case "Telegram":
                await _subscriptionService.SendTelegramNotification(subscription.UserId.ToString(), message);
                break;
        }
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