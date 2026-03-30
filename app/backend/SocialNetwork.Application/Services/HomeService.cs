using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class HomeService: IHomeService
{
    readonly ApplicationDbContext _dbContext;

    public HomeService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<(double latRounded, double lngRounded, List<Post> posts
            , int page, int pageSize, bool hasMore)>
        GetHomeAsync(string userId, double lat, double lng,
            int page, int pageSize, CancellationToken ct)
    {
        page = page < 1 ? 1 : page;
        pageSize = pageSize <= 0 ? 10 : pageSize;
        var query = _dbContext.Posts
            .AsNoTracking()
            .Where(p => p.IsActive);
        
        var latRounded = Math.Round(lat, 2);
        var lngRounded = Math.Round(lng, 2);

        query = query.Where(p =>
            p.LatRounded == latRounded &&
            p.LongRounded == lngRounded);

        query = query.OrderByDescending(p => p.CreatedAt);
        var skip = (page - 1) * pageSize;

        var posts = await query
            .Skip(skip)
            .Take(pageSize + 1)
            .Select(p => new Post
            {
                Id = p.Id,
                UserId = p.UserId,
                CategoryId = p.CategoryId,
                Title = p.Title,
                Description = p.Description,
                LatRounded = p.LatRounded,
                LongRounded = p.LongRounded,
                CreatedAt = p.CreatedAt,
                Images = p.Images
                    .OrderBy(i => i.SortOrder)
                    .Select(i => new PostImage
                    {
                        Id = i.Id,
                        PostId = i.PostId,
                        Url = i.Url,
                        SortOrder = i.SortOrder
                    })
                    .ToList(),
                Likes = new List<PostLike>(),
                Comments = new List<PostComment>()
            })
            .ToListAsync(ct);
        
        var hasMore = posts.Count>pageSize;
        if (hasMore)
        {
            posts = posts.Take(pageSize).ToList();
        }
        
        return (latRounded, lngRounded, posts, page, pageSize, hasMore);


    }
}