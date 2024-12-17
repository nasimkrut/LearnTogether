using System.Text;
using LearnTogether.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LearnTogether.API.Extaensions;

public static class ApiExtensions
{
    public static void AddApiAuthentication(this IServiceCollection serviceCollection, IOptions<JwtOptions> jwtOptions)
    {
        serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Value.SecretKey))
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["LearnTogetherCookies"];

                        return Task.CompletedTask;
                    }
                };
            });

        serviceCollection.AddAuthentication();
    }
}