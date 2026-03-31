using SocialNetwork.Domain.Entities;

namespace SocialNetwork.Application.Interfaces;

public interface IChatService
{
    Task<Message> SendMessageAsync(Guid chatId, string senderId, string text);
    Task<List<Message>> GetChatMessagesAsync(Guid chatId, string userId);
}