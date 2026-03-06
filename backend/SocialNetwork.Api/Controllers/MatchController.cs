using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;

namespace SocialNetwork.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class MatchController:ControllerBase
{
    private readonly IMatchService _matchService;

    public MatchController(IMatchService matchService)
    {
        _matchService = matchService;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary(CancellationToken ct)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _matchService.GetSummaryAsync(userId, ct);
        return Ok(result);
    }
}