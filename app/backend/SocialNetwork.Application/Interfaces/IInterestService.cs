using SocialNetwork.Domain.Entities;

namespace SocialNetwork.Application.Interfaces;

public interface IInterestService
{
    Task<List<Interest>> GetAllAsync();
    Task<Interest> CreateAsync(string name);
}