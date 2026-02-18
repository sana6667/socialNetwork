namespace SocialNetwork.Application.Interfaces;

public interface IUserService
{
    Task SetInterestsAsync(string userId, List<int> interestIds);
    Task SetPrioritiesAsync(string userId, List<int> priorityIds);
}