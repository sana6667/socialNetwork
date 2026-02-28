using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class MatchService : IMatchService
{
    private readonly ApplicationDbContext _dbContext;

    public MatchService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<(int count, List<(double lat, double lng, string avatarUrl)> Pins)> GetSummaryAsync(string userId, CancellationToken ct)
    {
        var me = await _dbContext.Users.AsNoTracking()
            .Where(u => u.Id == userId)
            .Select(u => new
            {
                u.Id,
                u.LatRounded,
                u.LngRounded,
                InterestIds = u.Interests.Select(ui => ui.InterestId).ToList()
            })
            .FirstOrDefaultAsync();

        if (me == null || me.LatRounded == 0 || me.LngRounded == 0 || me.InterestIds == null
            || me.InterestIds.Count == 0)
        {
            return ( 0, new List<(double lat, double lng, string avatarUrl)>() );
        }
        
        var since  = DateTime.UtcNow.AddDays(-30);

        var rawCount = await _dbContext.Users
            .AsNoTracking()
            .Where(u =>
                u.Id != userId &&
                //u.IsDiscoverable &&
                u.LastActiveAt >= since &&
                u.LatRounded == me.LatRounded &&
                u.LngRounded == me.LngRounded
            ).Select(u => new
            {
                u.Id,
                Shared = u.Interests.Count(ui => me.InterestIds.Contains(ui.InterestId))
            })
            .Where(x => x.Shared >= 2)
            .Select(x => x.Id)
            .Distinct()
            .CountAsync();

        if (rawCount < 10)
        {
            return (0, new List<(double lat, double lng, string avatarUrl)>());
        }
        var count = BucketCount(rawCount);
        
        var pins = GenerateFakePins(me.LatRounded.Value, me.LngRounded.Value, count);

        return (count, pins);


    }


    private static int BucketCount(int count)
    {
        if (count < 50) return 50;
        if (count < 100) return 100;
        if (count < 200) return 200;
        if (count < 500) return 500;
        if (count < 1000) return 1000;
        if (count < 2000) return 2000;
        return (int)(Math.Ceiling(count / 1000.0)*1000);
    }

    private static List<(double lat, double lng, string avatarUrl)>
        GenerateFakePins(double centerLat, double centerLng, int count)
    {
        var rng = Random.Shared;
        var pinCount = Math.Clamp((int)(Math.Log(count + 1) * 8), 12, 30);
        var avatars = new[]
        {
            "/avatars/a1.png"
        };

        var pins = new List<(double lat, double lng, string avatarUrl)>(pinCount);
        
        //250m-1500m fake ring

        double minR = 250, maxR = 1500;

        for (int i = 0; i < pinCount; i++)
        {
            var u = rng.NextDouble();
            var r = Math.Sqrt(u)*(maxR - minR);
            var angle = rng.NextDouble() * 2.0 * Math.PI;
            
            var dLat=(r*Math.Cos(angle))/111_320.0;
            var dLng=(r*Math.Sin(angle))/(111_320.0*Math.Cos(centerLat*Math.PI/180.0)*180.0);

            var lat = Math.Round(centerLat + dLat, 3);
            var lng = Math.Round(centerLng + dLng, 3);
            
            pins.Add(new(lat, lng, avatars[rng.Next(avatars.Length)]));
        }
        
        return pins;



    }
    
    
}