namespace LearnTogether.Core.Entities;

public class Post
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId
    { 
        get => User.Id;
        set {}
        
    }

    public Subject RequiredSubject { get; set; } 
    public Subject[] HelpSubjects { get; set; } 

    public string Description { get; set; }

    public double Rating
    {
        get => User?.Rating ?? 0;
        set {}
    }
    public DateTimeOffset DateCreated { get; set; }

    public List<string> Tags { get; set; }
    
    public virtual User User { get; set; }
}