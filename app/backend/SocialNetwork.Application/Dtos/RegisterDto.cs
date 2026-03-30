using Microsoft.AspNetCore.Http;

namespace SocialNetwork.Application.Dtos;

public class RegisterDto
{
    public string Username { get; set; } = null!; 
    public string? Password { get; set; }
    public string City { get; set; } = null!;
    public IFormFile? Image { get; set; } = null!;
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public string Name { get; set; } = null!;
    public List<int> InterestIds { get; set; } = new();
    public List<int> PriorityIds { get; set; } = new();    
    
}