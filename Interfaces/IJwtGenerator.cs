using Microsoft.IdentityModel.Tokens;

namespace socialNetwork.Services;

public interface IJwtGenerator
{
    TokenValidationParameters TokenValidationParameters { get; }

    string GenerateToken(Guid userId);
}