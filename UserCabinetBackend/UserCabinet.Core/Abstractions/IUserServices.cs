public interface IUserService
{
    Task<bool> RegisterUserAsync(UserDto userDto);
}

