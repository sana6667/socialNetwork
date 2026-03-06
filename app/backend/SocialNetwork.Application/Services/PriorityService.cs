using Microsoft.EntityFrameworkCore;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Application.Services;

public class PriorityService : IPriorityService
{
    readonly ApplicationDbContext _dbContext;

    public PriorityService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
   
    public async Task<List<Priority>> GetAllAsync()
    {
        return await _dbContext.Priorities
            .OrderBy(i => i.Name)
            .ToListAsync();
    }

    public async Task<Priority> CreateAsync(string name)
    {
        var exists = await _dbContext
            .Priorities
            .AnyAsync(i => i.Name == name);
        if (exists)
        {
            throw new Exception("The interest alredy exists");
        }
        
        var priority = new Priority {Name = name};
        _dbContext.Priorities.Add(priority);
        
        await  _dbContext.SaveChangesAsync();

        return priority;
    }
}