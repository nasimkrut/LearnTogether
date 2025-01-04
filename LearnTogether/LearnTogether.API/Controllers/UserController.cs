using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LearnTogether.Core.Data_Transfer_Objects;
using LearnTogether.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using LearnTogether.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace LearnTogether.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet("auth")]
    public IActionResult Authenticate([FromQuery] TelegramAuthModel model)
    {
        // Проверяем подпись
        if (!VerifyTelegramAuth(model))
        {
            return Unauthorized(new { status = "error", message = "Invalid signature" });
        }

        // Проверяем срок действия (опционально)
        var authTime = DateTimeOffset.FromUnixTimeSeconds(model.AuthDate);
        if ((DateTime.UtcNow - authTime.UtcDateTime).TotalSeconds > 86400)
        {
            return Unauthorized(new { status = "error", message = "Auth time expired" });
        }

        // Успешная авторизация
        return Ok(new
        {
            status = "success",
            username = model.Username,
            chat_id = model.Id
        });
    }
    
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

    
  // [Authorize]
    [HttpGet("getUserId")]
    public async Task<ActionResult<Guid>> GetUserIdByUserName([FromQuery] string userName) 
        => await userService.GetUserIdByUserNameAsync(userName);

  // [Authorize]
    [HttpGet("getUserByUserName")]
    public async Task<ActionResult<User>> GetUserByUserName([FromQuery] string userName)
    {
        return await userService.GetUserByUserName(userName);
    }
    
  // [Authorize]
    [HttpGet("getUserByUserId")]
    public async Task<ActionResult<User>> GetUserByUserId([FromQuery] Guid userId)
    {
        return await userService.GetUserByUserId(userId);
    }
    
  // [Authorize]
    [HttpPost("userUpdate")]
    public async Task<ActionResult<Guid>> UpdateUser([FromBody] User userUpdateDto)
    {
        var user = await userService.UpdateUserAsync(userUpdateDto.Id, userUpdateDto.UserName, userUpdateDto.FullName,
            userUpdateDto.PasswordHash, userUpdateDto.Rating, userUpdateDto.Description);

        return Ok(user);
    }
    
    private bool VerifyTelegramAuth(TelegramAuthModel data)
    {
        // Сортируем параметры и формируем строку для проверки
        var authData = new StringBuilder();
        if (!string.IsNullOrEmpty(data.FirstName)) authData.Append($"first_name={data.FirstName}\n");
        if (!string.IsNullOrEmpty(data.LastName)) authData.Append($"last_name={data.LastName}\n");
        if (!string.IsNullOrEmpty(data.Username)) authData.Append($"username={data.Username}\n");
        if (!string.IsNullOrEmpty(data.PhotoUrl)) authData.Append($"photo_url={data.PhotoUrl}\n");
        authData.Append($"auth_date={data.AuthDate}\nid={data.Id}");
    
        // Генерируем HMAC-SHA256 для проверки
        var botKey = "7503585232:AAEWXaU4X5xVQuMst_jBQXT_D4JMj4KSbOE";
        var secretKey = SHA256.HashData(Encoding.UTF8.GetBytes(botKey));
        using var hmac = new HMACSHA256(secretKey);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(authData.ToString()));
    
        // Преобразуем hash в строку
        var computedHashHex = BitConverter.ToString(computedHash).Replace("-", "").ToLower();
    
        // Сравниваем с hash, который прислал Telegram
        return computedHashHex == data.Hash;
    }
}

public class TelegramAuthModel
{
    public long Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string PhotoUrl { get; set; }
    public long AuthDate { get; set; }
    public string Hash { get; set; }
}