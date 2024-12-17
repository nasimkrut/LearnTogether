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
    public async Task<ActionResult<Guid>> Register([FromBody] User user)
    {
        var result = await _userService.RegisterUserAsync(user);
        if (!result)
            return BadRequest("User already exists");
        var userId = await _userService.GetUserIdByUserNameAsync(user.UserName);
        return userId;
    }

    [HttpPost("login")]
    public async Task<ActionResult<Guid>> Login([FromBody] UserLoginDTO loginDto)
    {
        var user = await _userService.AuthenticateAsync(loginDto.UserName, loginDto.Password);
        if (user == null)
            return Unauthorized("Invalid credentials");

        // var token = _userService.GenerateJwtToken(user);
        var userId = await _userService.GetUserIdByUserNameAsync(user.UserName);
        return userId ;
    }

    [HttpGet("getUserId")]
    public async Task<ActionResult<Guid>> GetUserIdByUserName([FromQuery] string userName) 
        => await _userService.GetUserIdByUserNameAsync(userName);

    [HttpGet("getUserByUserName")]
    public async Task<ActionResult<User>> GetUserByUserName([FromQuery] string userName)
    {
        return await _userService.GetUserByUserName(userName);
    }
    
    [HttpGet("getUserByUserId")]
    public async Task<ActionResult<User>> GetUserByUserId([FromQuery] Guid userId)
    {
        return await _userService.GetUserByUserId(userId);
    }
    
    [HttpPost("userUpdate")]
    public async Task<ActionResult<Guid>> UpdateUser([FromBody] User userUpdateDto)
    {
        var user = await _userService.UpdateUserAsync(userUpdateDto.Id, userUpdateDto.UserName, userUpdateDto.FullName,
            userUpdateDto.PasswordHash, userUpdateDto.Rating, userUpdateDto.Description);

        return Ok(user);
    }
}