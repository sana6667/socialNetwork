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

        
    }
    
}