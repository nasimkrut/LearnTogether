namespace UserCabinetBackend.Models;

public class Skill
{
    private Skill(int id, string name, string description)
    {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public int id { get;}
    public string name { get; }
    public string description { get; }
    
}