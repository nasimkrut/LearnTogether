using LearnTogether.Core.Data_Transfer_Objects;
using LearnTogether.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using LearnTogether.Core.Interfaces;

namespace LearnTogether.API.Controllers;

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
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var result = await _userService.RegisterUserAsync(user);
        return result ? Ok("User registered successfully") : BadRequest("User already exists");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO loginDto)
    {
        var user = await _userService.AuthenticateAsync(loginDto.UserName, loginDto.Password);
        if (user == null)
            return Unauthorized("Invalid credentials");

        var token = _userService.GenerateJwtToken(user);
        return Ok(new { Token = token });
    }

    [HttpGet("getUserId")]
    public async Task<ActionResult<Guid>> GetUserIdByUserName([FromQuery] string userName) 
        => await _userService.GetUserIdByUserNameAsync(userName);

    [HttpGet("getUserByUserName")]
    public async Task<ActionResult<User>> GetUserByUserName([FromQuery] string userName)
    {
        return await _userService.GetUserByUserName(userName);
    }
    public async Task<ActionResult<Guid>> UpdateUser(Guid id, [FromBody] User userUpdateDto)
    {
        var user = await _userService.UpdateUserAsync(id, userUpdateDto.UserName, userUpdateDto.FullName,
            userUpdateDto.PasswordHash, userUpdateDto.Rating);

        return Ok(user);
    }
}