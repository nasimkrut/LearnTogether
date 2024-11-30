using System.Net.Mail;

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
            const string botToken = "тут будет токен бота";
            var url = $"тут будет урл";

            using var httpClient = new HttpClient();
            await httpClient.GetAsync(url);
        }
    }
}