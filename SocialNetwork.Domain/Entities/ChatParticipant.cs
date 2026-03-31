namespace SocialNetwork.Domain.Entities;

public class ChatParticipant
{
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; } = null!;
    public string UserId { get; set; } = null!;
}