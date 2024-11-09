using Microsoft.EntityFrameworkCore;
using UserCabinet.Application.Services;
using UserCabinet.DataAccess;
using UserCabinet.DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(ApplicationDbContext)));
    });

// builder.Services.AddScoped<IUserServices, UserServices>();
// builder.Services.AddScoped<IUsersRepository, UsersRepository>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();