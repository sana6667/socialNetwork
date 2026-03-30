using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Api.Controllers;



[ApiController]
[Route("api/[controller]")]
public class HomeController: ControllerBase
{
    
    private readonly IHomeService _homeService;

    public HomeController(IHomeService homeService)
    {
     
        _homeService = _homeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetHome(
        double lat, double lng,
        int page = 1,
        int pageSize = 10,
        CancellationToken ct = default)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var (latRounded, lngRounded, posts, currentPage, currentPageSize, hasMore) =
            await _homeService.GetHomeAsync(userId, lat, lng, page, pageSize, ct);
        return Ok(new
        {
            latRounded,
            lngRounded,
            posts,
            page = currentPage,
            pageSize = currentPageSize, hasMore
        });
    }
}