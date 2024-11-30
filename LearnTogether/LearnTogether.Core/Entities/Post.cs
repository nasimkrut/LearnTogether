using Newtonsoft.Json;

namespace LearnTogether.Core.Entities;

public class Post
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Subject RequiredSubject { get; set; } 
    public Subject[] HelpSubjects { get; set; } 

    public string Description { get; set; }

    public DateTimeOffset DateCreated { get; set; } = DateTimeOffset.UtcNow;
    
    public double Rating
    {
        get => User?.Rating ?? 0;
        set { }
    }


    public List<string> Tags { get; set; }
    
    [JsonIgnore] 
    public virtual User User { get; set; }
}