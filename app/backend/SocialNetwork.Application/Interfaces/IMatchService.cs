namespace SocialNetwork.Application.Interfaces;

public interface IMatchService
{
    Task<(int count, List<(double lat, double lng, string avatarUrl)> Pins)> 
    GetSummaryAsync(string userId, CancellationToken ct);
}