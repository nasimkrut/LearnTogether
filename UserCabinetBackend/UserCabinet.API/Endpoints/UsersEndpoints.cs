using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace UserCabinetBackend.Endpoints;

public class UsersEndpoints
{
    public static IEndpointRouteBuilder MapUsersEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost("register", Register);
        
        app.MapPost("login", Login);
        
        return app; 
    }

    private static async Task<IResult> Register()
    {
        return Results.Ok();
    }

    private static Task Login(HttpContext context)
    {
        throw new NotImplementedException();
    }
}