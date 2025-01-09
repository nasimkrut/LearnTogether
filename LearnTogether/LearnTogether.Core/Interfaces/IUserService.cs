﻿using Telegram.Bot.Types;
using User = LearnTogether.Core.Entities.User;

namespace LearnTogether.Core.Interfaces;

public interface IUserService
{
    Task<bool> RegisterUserAsync(User user);
        
    Task<User> AuthenticateAsync(string userName, string password);
        
    string GenerateJwtToken(User user);

    Task<Guid> GetUserIdByUserNameAsync(string userName);
    Task<User> GetUserByUserId(Guid userId);
    Task<User> GetUserByUserName(string userName);
    
    Task<Guid> UpdateUserAsync(Guid id, string username, string telegramName, 
        ChatId telegramChatId, string avatarUrl, string fullName, string password, double rating, string description);
    
    Task<Guid> DeleteUserAsync(Guid id);
    Task<Guid> UpdateUserTelegramAsync(Guid userId, string telegramName, ChatId telegramChatId);
}