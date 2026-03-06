namespace SocialNetwork.Domain.Entities;

public class Priority
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<UserPriority> Users { get; set; } = new();
}