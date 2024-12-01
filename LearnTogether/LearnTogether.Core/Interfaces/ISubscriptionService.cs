namespace LearnTogether.Application.Services;

public interface ISubscriptionService
{
    Task SendEmailNotification(string email, string message);
    Task SendTelegramNotification(string telegramChatId, string message);
}