namespace SocialNetwork.Domain.Entities;

public class UserPriority
{
    public string UserId { get; set; }
    public User User { get; set; }
    public int PriorityId { get; set; }
    public Priority Priority { get; set; }
}