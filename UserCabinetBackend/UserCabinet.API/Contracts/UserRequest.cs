namespace UserCabinetBackend.Contracts;

public record UserRequest(
    string Name,
    string Email,
    string Password,
    string AvatarUrl,
    double Rating,
    string Role);
