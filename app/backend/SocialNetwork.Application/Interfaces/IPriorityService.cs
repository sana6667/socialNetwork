using SocialNetwork.Domain.Entities;

namespace SocialNetwork.Application.Interfaces;

public interface IPriorityService
{
    Task<List<Priority>> GetAllAsync();
    Task<Priority> CreateAsync(string name);
}