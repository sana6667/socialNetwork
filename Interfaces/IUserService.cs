namespace socialNetwork.Services;

public interface IUserService
{
    Task<Guid> CreateUserAsync(string username, string password);
    Task<bool> UsernameExistsAsync(string username);
    Task<Guid?> GetUserIdByCredentialsAsync(string username, string password);
}