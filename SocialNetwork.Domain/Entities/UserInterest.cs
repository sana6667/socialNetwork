namespace SocialNetwork.Domain.Entities;

public class UserInterest
{
    public string UserId { get; set; }
    public User User { get; set; }
    public int InterestId { get; set; }
    public Interest Interest { get; set; }
}