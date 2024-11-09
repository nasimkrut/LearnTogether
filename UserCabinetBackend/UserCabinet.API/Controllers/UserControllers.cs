using Microsoft.AspNetCore.Mvc;

namespace UserCabinetBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        var result = await _userService.RegisterUserAsync(userDto);
        return result ? Ok("User registered successfully") : BadRequest("User already exists");
    }
}