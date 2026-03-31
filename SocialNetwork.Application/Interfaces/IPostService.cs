using SocialNetwork.Domain.Entities;
using SocialNetwork.Domain.Enums;

namespace SocialNetwork.Application.Interfaces;

public interface IPostService
{
    Task<List<Post>> GetPostsByCategoryIdAsync(
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
        CancellationToken ct);
}