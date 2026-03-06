using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SocialNetwork.Infrastructure.Data;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
// Use the same provider you use in Program.cs / Startup.cs //
// Replace with your actual connection string
        optionsBuilder.UseSqlServer(
            "Server=.;Database=SocialNetworkDb;Trusted_Connection=True; TrustServerCertificate=True;");
        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
