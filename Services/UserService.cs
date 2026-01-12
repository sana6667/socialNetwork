using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using socialNetwork.Entities;
using socialNetwork.Interfaces;
using socialNetwork.Utilities;

namespace socialNetwork.Services;

public class UserService: IUserService
{
    private readonly IApplicationDbContext _context;

    public UserService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateUserAsync(string username, string password)
    {
        var hasher = new HashUtility();
        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Username = username,
            PasswordHash = hasher.Hash(password),
            CreateAt = DateTime.Now,
            UpdateAt = DateTime.Now
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser.Id;
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await _context.Users.AnyAsync(user => user.Username.Equals(username));
    }

    public Task<string> GetUserJwToken(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<Guid?> GetUserIdByCredentialsAsync(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Username.Equals(username));
        if (user is null)
        {
            return null:
        }

        var hasher = new HashUtility();
        string hash = hasher.Hash(password);
        if (!user.PasswordHash.Equals(hash))
        {
            return null;
        }

        return user.Id;
    }
}