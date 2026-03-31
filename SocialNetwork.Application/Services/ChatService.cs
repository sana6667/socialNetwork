using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class ChatService:IChatService
{
    readonly ApplicationDbContext _dbContext;

    public ChatService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Message> SendMessageAsync(Guid chatId, string senderId, string text)
    {
        var isParticipant = await _dbContext.Set<ChatParticipant>()
            .AnyAsync(x => x.ChatId == chatId && x.UserId == senderId);
        if (!isParticipant)
        {
            throw new Exception("A user is not a paticipant of this chat");
        }
        var message = new Message()
        {
            Id = Guid.NewGuid(),
            ChatId = chatId,
            SenderId = senderId,
            Text = text,
            SentAt = DateTime.Now,
            IsRead = false

        };
        _dbContext.Set<Message>().Add(message);
        await _dbContext.SaveChangesAsync();
        return message;
    }

    public async Task<List<Message>> GetChatMessagesAsync(Guid chatId, string userId)
    {
        var isParticipant = await _dbContext.ChatParticipants
            .AnyAsync(x => x.ChatId == chatId && x.UserId == userId);

        if (!isParticipant)
        {
            throw new Exception("Access denied");
        }

        var messages = await _dbContext.Messages
            .AsNoTracking()
            .Where(m => m.ChatId == chatId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
        return (messages);
    }
}