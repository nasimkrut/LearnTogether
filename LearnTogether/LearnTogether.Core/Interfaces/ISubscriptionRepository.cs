using LearnTogether.Core.Entities;

namespace LearnTogether.Application.Services;

public interface ISubscriptionRepository
{
    Task<List<Subscription>> GetSubscriptionsByUserId(Guid userId);
    Task<List<Subscription>> GetSubscriptionsBySubjects(IEnumerable<Subject> subjects);
    Task AddSubscription(Subscription subscription);
    Task RemoveSubscription(int subscriptionId);
}