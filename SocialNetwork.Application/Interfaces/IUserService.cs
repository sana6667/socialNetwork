namespace SocialNetwork.Application.Interfaces;

public interface IUserService
{
    Task SetInterestsAsync(string userId, List<int> interestIds);
    Task SetPriorityAsync(string userId, int priorityId);
}