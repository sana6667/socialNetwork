namespace SocialNetwork.Domain.Entities;

public class PostImage
{
    
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    public Post Post { get; set; } = default!;
    public string Url { get; set; }
    public int SortOrder { get; set; }
}