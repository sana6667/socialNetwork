using SocialNetwork.Domain.Entities;

namespace SocialNetwork.Application.Interfaces;

public interface IHomeService
{
    Task<(double latRounded, double lngRounded, List<Post> posts, int page, int pageSize, bool hasMore)>
        GetHomeAsync(string userId, double lat, double lng,
            int page, int pageSize, CancellationToken ct);
}