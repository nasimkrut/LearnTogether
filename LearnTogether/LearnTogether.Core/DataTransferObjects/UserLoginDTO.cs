namespace LearnTogether.Core.Data_Transfer_Objects;

public class UserLoginDTO
{
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Password { get; set; }
    public double Rating { get; set; }
}