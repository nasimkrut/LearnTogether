using System.Net.Mail;
using Telegram.Bot;

namespace LearnTogether.Application.Services
{
    public class SubscriptionService : ISubscriptionService
    {
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

        public async Task SendTelegramNotification(string telegramChatId, string message)
        {
            // нужно хранить в User айди чата тг 
            
            const string botToken = "7503585232:AAEWXaU4X5xVQuMst_jBQXT_D4JMj4KSbOE";
            var bot = new TelegramBotClient(botToken);
            var id = 1162685330;

            await bot.SendMessage(id, message);
        }
    }
}