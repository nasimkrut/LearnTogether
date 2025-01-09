﻿using LearnTogether.Core.Interfaces;
using LearnTogether.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Telegram.Bot.Types;
using User = LearnTogether.Core.Entities.User;

namespace LearnTogether.Application.Services;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByUserNameAsync(string userName)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
    }
    
    public async Task<User> GetUserByUserIdAsync(Guid userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }


    public async Task AddUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<Guid> UpdateUser(Guid id, string username, string telegramName, ChatId telegramChatId, string fullName, string password, double rating, string description)
    {
        await _context.Users.
            Where(b => b.Id == id).
            ExecuteUpdateAsync(s => s
               .SetProperty(b => b.UserName, b => username)
               .SetProperty(b => b.TelegramName, b => telegramName)
               .SetProperty(b => b.TelegramChatId, b => telegramChatId)
               .SetProperty(b => b.FullName, b => fullName)
               .SetProperty(b => b.PasswordHash, b => password)
               .SetProperty(b => b.Rating, b => rating)
               .SetProperty(b => b.Description, b => description));
        
        return id;
    }

    public async Task<Guid> DeleteUser(Guid id)
    {
        await _context.Users
            .Where(b => b.Id == id)
            .ExecuteDeleteAsync();
        
        return id;
    }
}