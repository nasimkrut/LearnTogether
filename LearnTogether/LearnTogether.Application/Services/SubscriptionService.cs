using System.Net.Mail;
using Telegram.Bot;
using Telegram.Bot.Types;


namespace LearnTogether.Application.Services
{
    public class SubscriptionService(ITelegramBotClient botClient) : ISubscriptionService
    {
        public async Task SendTelegramNotification(ChatId telegramChatId, string message)
        {
            await botClient.SendTextMessageAsync(telegramChatId, message);
        }

        public async Task SendEmailNotification(string email, string message)
        {
            var smtpClient = new SmtpClient("smtp.your-email.com")
            {
                Port = 111,
                Credentials = new System.Net.NetworkCredential("емаил", "пароль"),
                EnableSsl = true
            };

            await smtpClient.SendMailAsync(new MailMessage("емаил", email, "предмет", message));
        }
    }
}