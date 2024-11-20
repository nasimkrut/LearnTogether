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
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
    {
        var user = await _userService.AuthenticateAsync(loginDto.Email, loginDto.Password);
        if (user == null)
            return Unauthorized("Invalid credentials");

        var token = _userService.GenerateJwtToken(user);
        return Ok(new { Token = token });
    }

    public async Task<ActionResult<Guid>> UpdateUser(Guid id, [FromBody] UserLoginDto userUpdateDto)
    {
        var user = await _userService.UpdateUserAsync(id, userUpdateDto.Username, userUpdateDto.Email, userUpdateDto.Password, userUpdateDto.Rating);

        return Ok(user);
    }
}