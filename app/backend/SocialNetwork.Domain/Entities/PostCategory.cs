namespace SocialNetwork.Domain.Entities;

public class PostCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    //public string? Icon {get;set;}
    public int SortOrder { get; set; }
    public ICollection<Post> Posts { get; set; } = new List<Post>();
}