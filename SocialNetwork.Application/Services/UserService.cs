using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class UserService : IUserService
{

    readonly ApplicationDbContext _dbContext;

    public UserService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        
    }
    
    
    public async Task SetInterestsAsync(string userId, List<int> interestIds)
    {
        var user = await _dbContext.Users
            .Include(u => u.Interests)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            throw new Exception($"User wasn't not found");
        }
        
        user.Interests.Clear();

        foreach (var interestId in interestIds.Distinct())
        {
            user.Interests.Add(new UserInterest
            {
                UserId = user.Id,
                InterestId = interestId
            });
        }

        await _dbContext.SaveChangesAsync();
    }

    public async Task SetPriorityAsync(string userId, int priorityId)
    {
        var user = await _dbContext.Users
            .Include(u => u.Priority)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            throw new Exception($"User wasn't not found");
        }
        
       user.PriorityId = priorityId;

        await _dbContext.SaveChangesAsync();
    }
}