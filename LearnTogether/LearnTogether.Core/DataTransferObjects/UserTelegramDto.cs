using Telegram.Bot.Types;

namespace LearnTogether.Core.Data_Transfer_Objects;

public class UserTelegramDto
{
    public string UserName { get; set; }
    public string TelegramName { get; set; }
    public ChatId TelegramChatId { get; set; }
}