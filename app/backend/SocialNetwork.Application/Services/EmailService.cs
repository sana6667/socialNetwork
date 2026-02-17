using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using SocialNetwork.Application.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;    

namespace SocialNetwork.Application.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config) => _config = config;
    public async Task SendAsync(string email, string subject, string content)
    {
        var client = new SendGridClient(_config["SendGrid:ApiKey"]);
        var from = new EmailAddress(
            _config["SendGrid:FromEmail"],
            _config["SendGrid:FromName"]);

        var to = new EmailAddress(email);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, "", content);

        await client.SendEmailAsync(msg);
    }
    
    
    
}