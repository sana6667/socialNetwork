using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class InterestService :IInterestService
{
    readonly ApplicationDbContext _dbContext;

    public InterestService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
   
    public async Task<List<Interest>> GetAllAsync()
    {
        return await _dbContext.Interests
            .OrderBy(i => i.Name)
            .ToListAsync();
    }

    public async Task<Interest> CreateAsync(string name)
    {
        var exists = await _dbContext
            .Interests
            .AnyAsync(i => i.Name == name);
        if (exists)
        {
            throw new Exception("The interest alredy exists");
        }
        
        var interest = new Interest {Name = name};
        _dbContext.Interests.Add(interest);
        
        await  _dbContext.SaveChangesAsync();

        return interest;
    }
}