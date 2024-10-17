namespace UserCabinet.Core.Models;

public class User
{
    public const int MaxNameLength = 200;

    private User(Guid id, string name, string email, string password, string avatarUrl, double rating, string role)
    {
        Id = id;
        Name = name;
        Email = email;
        Password = password;
        AvatarUrl = avatarUrl;
        Rating = rating;
        Role = role;
    }

    public Guid Id { get; }
    public string Name { get; }
    public string Email { get; }
    public string Password { get; }
    public string AvatarUrl { get; }
    public double Rating { get; }
    public string Role { get; }

    public static (User user, string error) Create(Guid id, string name, string email, string password, string avatarUrl,
        double rating, string role)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(name) || name.Length > MaxNameLength)
            error = "Ochenb mnogo brat";


        var user = new User(id, name, email, password, avatarUrl, rating, role);

        return (user, error);
    }
}