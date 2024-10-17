namespace UserCabinet.DataAccess.Entites;

public class UserEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string AvatarUrl { get; set; }
    public double Rating { get; set; }
    public string Role { get; set; }
}