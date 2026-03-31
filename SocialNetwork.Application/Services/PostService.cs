using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Domain.Enums;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class PostService: IPostService
{
    readonly ApplicationDbContext _dbContext;

    public PostService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    
    public async Task<List<Post>> GetPostsByCategoryIdAsync(
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
        page = page < 1 ? 1 : page;
        pageSize = pageSize <= 0 ? 10 : pageSize;

        var query = _dbContext.Posts
            .AsNoTracking()
            .Include(p => p.User)
            .Include(p => p.Images)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
            .Where(p => p.IsActive && p.CategoryId == categoryId);

        if (!string.IsNullOrWhiteSpace(city))
            query = query.Where(p => p.City == city);

        if (minBudget.HasValue)
            query = query.Where(p => p.Budget >= minBudget.Value);

        if (maxBudget.HasValue)
            query = query.Where(p => p.Budget <= maxBudget.Value);

        if (startDate.HasValue)
            query = query.Where(p => p.StartDate >= startDate.Value);

        if (endDate.HasValue)
            query = query.Where(p => p.EndDate <= endDate.Value);
        
        if(minAge.HasValue && maxAge.HasValue)
            query = query.Where(p=>p.User.Age>=minAge.Value && p.User.Age <=maxAge.Value);
        
        if(!string.IsNullOrWhiteSpace(gender.ToString()))
            query = query.Where(p => p.User.Gender == gender);
        
        if(isVarified.HasValue)
            query = query.Where(p=>p.User.IsVerified == isVarified);
        
        if(!string.IsNullOrWhiteSpace(destination))
            query = query.Where(p=>p.Destination == destination);
        
        if(!string.IsNullOrWhiteSpace(from))
            query = query.Where(p=>p.Destination == from);

        if (lat.HasValue && lon.HasValue)
        {
            query = query.Where(p =>
                Math.Abs(p.LatRounded - lat.Value) <= 1 &&
                Math.Abs(p.LongRounded - lon.Value) <= 1);
        }

        return await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);
    }
}