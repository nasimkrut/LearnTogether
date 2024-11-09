namespace User.Infrastructure;

public interface IPasswordHash
{
    string Generate(string password);
    bool Verify(string password, string hashedPassword);
}