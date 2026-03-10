using SocialNetwork.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SocialNetwork.Infrastructure.Data;


public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    
    public DbSet<RevokedToken> RevokedTokens { get; set; }
    public DbSet<Interest> Interests { get; set; }
    public DbSet<UserInterest> UserInterests { get; set; }
    public DbSet<Priority>Priorities{ get; set; }
    public DbSet<UserPriority> UserPriorities { get; set; }
    
    public DbSet<Post> Posts { get; set; }
    public DbSet<PostLike> PostLikes { get; set; }
    public DbSet<PostComment> PostComments { get; set; }
    public DbSet<PostImage> PostImages { get; set; }
    public DbSet<PostCategory> PostCategories { get; set; }
    
    
    //додати таблиці постів, коментів та лайків, а також зв'язки між ними

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<UserInterest>()
            .HasKey(ui => new { ui.UserId, ui.InterestId });
        
        builder.Entity<UserInterest>()
            .HasOne(ui => ui.User)
            .WithMany(u => u.Interests)
            .HasForeignKey(ui => ui.UserId);
        
        builder.Entity<UserInterest>()
            .HasOne(ui => ui.Interest)
            .WithMany(u => u.Users)
            .HasForeignKey(ui => ui.InterestId);
        
        builder.Entity<UserPriority>()
            .HasKey(ui => new { ui.UserId, ui.PriorityId });
        
        builder.Entity<UserPriority>()
            .HasOne(ui => ui.User)
            .WithMany(u => u.Priorities)
            .HasForeignKey(ui => ui.UserId);
        
        builder.Entity<UserPriority>()
            .HasOne(ui => ui.Priority)
            .WithMany(u => u.Users)
            .HasForeignKey(ui => ui.PriorityId);


        builder.Entity<Post>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Posts)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(p => p.Posts)
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<PostImage>()
            .HasOne(i => i.Post)
            .WithMany(p => p.Images)
            .HasForeignKey(i => i.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<PostLike>()
            .HasKey(l => new { l.PostId, l.UserId });

        builder.Entity<PostLike>()
            .HasOne(l => l.User)
            .WithMany(l => l.PostLikes)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<PostLike>()
            .HasOne(l => l.Post)
            .WithMany(l => l.Likes)
            .HasForeignKey(l => l.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<PostComment>()
            .HasOne(c=>c.Post)
            .WithMany(p=>p.Comments)
            .HasForeignKey(c=>c.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<PostComment>()
            .HasOne(c=>c.User)
            .WithMany(p=>p.PostComments)
            .HasForeignKey(c=>c.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Post>()
            .HasIndex(p => p.UserId);
        builder.Entity<Post>()
            .HasIndex(p => p.CategoryId);
        builder.Entity<Post>()
            .HasIndex(p => new { p.CategoryId, p.CreatedAt });

        builder.Entity<PostCategory>()
            .HasIndex(c => c.Slug)
            .IsUnique();

        builder.Entity<PostImage>()
            .HasIndex(i => new { i.PostId, i.SortOrder });
        builder.Entity<PostComment>()
            .HasIndex(c => c.PostId);
        builder.Entity<PostLike>()
            .HasIndex(l => l.UserId);




    }
    
}