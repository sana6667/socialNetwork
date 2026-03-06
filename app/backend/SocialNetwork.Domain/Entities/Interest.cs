namespace SocialNetwork.Domain.Entities;

public class Interest
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public List<UserInterest> Users { get; set; } = new ();
}