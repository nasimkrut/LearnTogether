using Microsoft.AspNetCore.Http.HttpResults;
using UserCabinetBackend.Contracts;
using UserCabinet.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace UserCabinetBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController
{
    private readonly IUserServices _userServices;

    public UsersController(IUserServices userServices)
    {
        _userServices = userServices;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserResponse>>> GetUsers()
    {
        var users = await _userServices.GetAllUsers();

        var response = users.Select(user =>
            new UserResponse(user.Id, user.Name, user.Email, user.Password, user.AvatarUrl, user.Rating, user.Role));
        
        return new OkObjectResult(response);
    }
}