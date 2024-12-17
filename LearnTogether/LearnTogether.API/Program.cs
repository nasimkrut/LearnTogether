using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LearnTogether.API.Extaensions;
using LearnTogether.Application.Services;
using LearnTogether.Core.Interfaces;
using LearnTogether.Infrastructure;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("http://learn-together.xyz/") 
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));

builder.Services.AddApiAuthentication(builder.Services.BuildServiceProvider()
    .GetRequiredService<IOptions<JwtOptions>>());

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

// app.UseCookiePolicy(new CookiePolicyOptions
// {
//     MinimumSameSitePolicy = SameSiteMode.Strict,
//     Secure = CookieSecurePolicy.Always
// });
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();