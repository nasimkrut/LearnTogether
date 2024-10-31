namespace UserCabinetBackend.Contracts;

public record UserResponse(
    Guid id,
    string name,
    string email,
    string password,
    string avatarUrl,
    double rating,
    string role);