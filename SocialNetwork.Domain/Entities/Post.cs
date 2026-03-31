namespace SocialNetwork.Domain.Entities;

public class Post
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    
    public string Title { get; set; }
    public string Description { get; set; }
    
    public string City { get; set; }
    public string CountryCode { get; set; }
    
    public int CategoryId { get; set; }
    public PostCategory Category { get; set; }
    
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public string? Destination { get; set; }
    public string? From { get; set; }
    
    public double LatRounded { get; set; }
    public double LongRounded { get; set; }
    public bool IsActive { get; set; } = true;
    public decimal? Budget { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<PostImage> Images { get; set; } = new List<PostImage>();
    public ICollection<PostLike> Likes { get; set; } = new List<PostLike>();
    public ICollection<PostComment> Comments { get; set; } = new List<PostComment>();
}