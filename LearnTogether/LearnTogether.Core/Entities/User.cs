using Telegram.Bot.Types;

namespace LearnTogether.Core.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserName { get; set; }
    public string TelegramName { get; set; }
    public ChatId TelegramChatId { get; set; }
    public string AvatarUrl { get; set; }
    public string FullName { get; set; }
    public string PasswordHash { get; set; }
    public double Rating { get; set; }
    public string Description { get; set; }
}