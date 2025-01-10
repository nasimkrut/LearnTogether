using Telegram.Bot.Types;

namespace LearnTogether.Application.Services;

public interface ISubscriptionService
{
    Task SendEmailNotification(string email, string message);
    Task SendTelegramNotification(int telegramChatId, string message);
}