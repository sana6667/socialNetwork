using Microsoft.AspNetCore.Identity;

namespace SocialNetwork.Domain.Entities;

public class User :IdentityUser
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public string City { get; set; }
    public double? LatRounded { get; set; }
    public double? LngRounded { get; set; }
    public DateTime? LocationUpdatedAt { get; set; }

    //public bool IsDiscoverable { get; set; } = true;
    
    public DateTime LastActiveAt { get; set; } = DateTime.UtcNow;
    
    public List<UserInterest> Interests { get; set; } = new ();
    public List<UserPriority> Priorities { get; set; } = new ();
    
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<PostLike> PostLikes { get; set; } = new List<PostLike>();
    public ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();
   

}
