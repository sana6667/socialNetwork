using Microsoft.AspNetCore.Identity;
using SocialNetwork.Domain.Enums;

namespace SocialNetwork.Domain.Entities;

public class User :IdentityUser
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public string City { get; set; }
    public double? LatRounded { get; set; }
    public double? LngRounded { get; set; }
    public DateTime? LocationUpdatedAt { get; set; }
    public int? Age { get; set; }
    public Gender? Gender { get; set; }
    public bool? IsVerified { get; set; } = false;

    //public bool IsDiscoverable { get; set; } = true;
    
    public DateTime LastActiveAt { get; set; } = DateTime.UtcNow;
    public Priority Priority { get; set; }
    public int PriorityId { get; set; }

    public List<UserInterest> Interests { get; set; } = new();
    
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<PostLike> PostLikes { get; set; } = new List<PostLike>();
    public ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();
   

}
