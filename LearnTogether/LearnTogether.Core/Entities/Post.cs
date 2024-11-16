namespace LearnTogether.Core.Entities;

public class Post
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }

    public Subject RequiredSubject { get; set; } 
    public Subject[] HelpSubjects { get; set; } 

    public string Description { get; set; }
    public double Rating { get; set; }
    public DateTime Datecreated { get; set; }
    public List<string> Tags { get; set; }
    
    public virtual User User { get; set; }
}