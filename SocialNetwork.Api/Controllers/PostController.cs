using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Enums;

namespace SocialNetwork.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PostController:ControllerBase
{
    readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    
    
    [HttpGet]
    public async Task<IActionResult> GetPosts(
        int categoryId,
        string? city,
        decimal? minBudget,
        decimal? maxBudget,
        int? minAge,
        int? maxAge,
        bool? isVarified,
        Gender gender,
        string? destination,
        string? from,
        DateOnly? startDate,
        DateOnly? endDate,
        double? lat,
        double? lon,
        int page,
        int pageSize,
        CancellationToken ct)
    {
        var posts = await _postService.GetPostsByCategoryIdAsync(
            categoryId,
            city,
            minBudget,
            maxBudget,
            minAge,
            maxAge,
            isVarified,
            gender,
            destination,
            from,
            startDate,
            endDate,
            lat,
            lon,
            page,
            pageSize,
            ct);
        
        return Ok(posts.Select(p => new
        {
            p.Id,
            p.Title,
            p.Description,
            p.City,
            p.CountryCode,
            p.StartDate,
            p.EndDate,
            p.Budget,
            p.CreatedAt,

            user = new
            {
                p.User.Id,
                p.User.Name,
                p.User.ImageUrl
            },

            image = p.Images
                .OrderBy(i => i.SortOrder)
                .Select(i => i.Url)
                .FirstOrDefault(),

            likesCount = p.Likes.Count,
            commentsCount = p.Comments.Count
        }));
    }
}
