using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using socialNetwork.Services;

namespace DefaultNamespace;

public class JwtGenerator : IJwtGenerator
{
    // секретный ключ шифрования токена (В КОДЕ НИКОГДА НЕ ХРАНИТЬ)
    private readonly string _secretKey = "ccf2e7b7-7606-477a-8e9f-39b30b6f9098-ccf2e7b7-7606-477a-8e9f-39b30b6f9098";
    
    private readonly string _issuer = "socialNetwork";
    
    private readonly string _audience = "socialNetworkClient";
    
    private readonly int _ttlMinutes = 5;
    
    public TokenValidationParameters TokenValidationParameters { get; }

    public JwtGenerator()
    {
        TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidIssuer = _issuer,
            ValidateAudience = true,
            ValidAudience = _audience
        };
    }
    
    public string GenerateToken(Guid userId)
    {
        var claims = new List<Claim>
        {
            new Claim("Hello", "World"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, userId.ToString())
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(_ttlMinutes),
            signingCredentials: credentials
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
        
    }
}