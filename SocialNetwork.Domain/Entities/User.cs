using Microsoft.AspNetCore.Identity;

namespace SocialNetwork.Domain.Entities;

public class User :IdentityUser
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public string City { get; set; }
    
    public List<UserInterest> Interests { get; set; } = new ();
    public List<UserPriority> Priorities { get; set; } = new ();
    
}