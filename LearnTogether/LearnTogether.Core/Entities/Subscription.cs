public class Subscription
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; } 
    public Guid? SubscribedToUserId { get; set; } 
    public int? SubscribedToSubjectId { get; set; } 
    public string NotificationMethod { get; set; } 
}