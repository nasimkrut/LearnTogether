using User.Infrastructure;

namespace UserCabinet.Core.Models;

public class User
{
    private const int MaxNameLength = 200;

    private User(string username, string email, string passwordHash)
    {
        Username = username;
        Email = email;
        PasswordHash = passwordHash;
    }

    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    public static (User user, string error) Create(Guid id, string name, string email, string password, string avatarUrl,
        double rating, string role)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(name) || name.Length > MaxNameLength)
            error = "Ochenb mnogo brat";


        var user = new User(name, email, .HashPassword(password));

        return (user, error);
    }
}