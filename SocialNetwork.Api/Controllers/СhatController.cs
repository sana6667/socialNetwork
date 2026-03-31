using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Application.Services;

namespace SocialNetwork.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class СhatController : ControllerBase
{
    readonly IChatService _chatService;

    public СhatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("{chatId}/messsages")]
    public async Task<IActionResult> GetMessages(Guid chatId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        try
        {
            var messages = await _chatService.GetChatMessagesAsync(chatId, userId);
            return Ok(messages);

        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid();
        }
        catch (Exception ex)
        {
            return BadRequest(new {message = ex.Message});
        }
    }
    
    
    
    
}