using LearnTogether.Core.Entities;

public class PostDto
{
    public Guid UserId { get; set; }
    public Subject RequiredSubject { get; set; } 
    public Subject[] HelpSubjects { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
}