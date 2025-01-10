using LearnTogether.Core.Data_Transfer_Objects;
using Microsoft.AspNetCore.Mvc;
using LearnTogether.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Telegram.Bot.Types;
using User = LearnTogether.Core.Entities.User;

namespace LearnTogether.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var result = await userService.RegisterUserAsync(user);
        return result ? Ok("User registered successfully") : BadRequest("User already exists");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDTO loginDto)
    {
        Console.WriteLine($"Attempting login for user: {loginDto.UserName}");
        var user = await userService.AuthenticateAsync(loginDto.UserName, loginDto.Password);

        if (user == null)
        {
            Console.WriteLine("Login failed: invalid credentials");
            return Unauthorized("Invalid credentials");
        }

        var token = userService.GenerateJwtToken(user);
        Console.WriteLine($"Generated token for user: {user.UserName}");

        HttpContext.Response.Cookies.Append("LearnTogetherCookies", token);

        return Ok(new { Token = token });
    }


    [Authorize]
    [HttpGet("getUserId")]
    public async Task<ActionResult<Guid>> GetUserIdByUserName([FromQuery] string userName)
        => await userService.GetUserIdByUserNameAsync(userName);

    [Authorize]
    [HttpGet("getUserByUserName")]
    public async Task<ActionResult<User>> GetUserByUserName([FromQuery] string userName)
    {
        return await userService.GetUserByUserName(userName);
    }

    [Authorize]
    [HttpGet("getUserByUserId")]
    public async Task<ActionResult<User>> GetUserByUserId([FromQuery] Guid userId)
    {
        return await userService.GetUserByUserId(userId);
    }

    [Authorize]
    [HttpPost("userUpdate")]
    public async Task<ActionResult<Guid>> UpdateUser([FromBody] User userUpdateDto)
    {
        var user = await userService.UpdateUserAsync(userUpdateDto.Id, userUpdateDto.UserName,
              userUpdateDto.TelegramName, userUpdateDto.TelegramChatId, userUpdateDto.AvatarUrl, userUpdateDto.FullName,
            userUpdateDto.PasswordHash, userUpdateDto.Rating, userUpdateDto.Description);

        return Ok(user);
    }
    
    [Authorize]
    [HttpPost("addTelegramData")]
    public async Task<ActionResult<Guid>> UserTg([FromBody] UserTelegramDto userTelegramDto)
    {
        var user = await userService.UpdateUserTelegramAsync(userTelegramDto.UserId,
            userTelegramDto.TelegramName, userTelegramDto.TelegramChatId);

        return Ok(user);
    }
    
    
    
}
