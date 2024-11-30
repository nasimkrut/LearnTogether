using LearnTogether.Core.Entities;
using LearnTogether.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Application.Services
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Subscription>> GetSubscriptionsByUserId(Guid userId)
        {
            return await _context.Subscriptions
                .Where(s => s.SubscribedToUserId == userId)
                .ToListAsync();
        }

        public async Task<List<Subscription>> GetSubscriptionsBySubjects(IEnumerable<Subject> subjects)
        {
            return await _context.Subscriptions
                .Where(s => s.SubscribedToSubjectId.HasValue 
                            && subjects.Select(sub => (int)sub).Contains(s.SubscribedToSubjectId.Value))
                .ToListAsync();
        }

        public async Task AddSubscription(Subscription subscription)
        {
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveSubscription(int subscriptionId)
        {
            var subscription = await _context.Subscriptions.FindAsync(subscriptionId);
            if (subscription != null)
            {
                _context.Subscriptions.Remove(subscription);
                await _context.SaveChangesAsync();
            }
        }
    }
}