using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Query;
using SocialNetwork.Application.Interfaces;

namespace SocialNetwork.Api.Hubs;

public class ChatHub:Hub
{
    private readonly IChatService _chatService;

    public ChatHub(IChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task JoinChat(Guid chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"chat_{chatId}");
    }

    public async Task LeaveChat(Guid chatId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"chat_{chatId}");
    }

    public async Task SendMessage(Guid chatId, string text)
    {
        var senderId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (senderId is null)
        {
            throw new HubException("Unathorized");
        }

        var message = await _chatService.SendMessageAsync(chatId, senderId, text);
        await Clients.Group($"chat_{chatId}")
            .SendAsync("ReceiveMessage", message);

    }
}