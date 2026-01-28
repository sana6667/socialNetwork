using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SocialNetwork.Application.Dtos;
using SocialNetwork.Application.Interfaces;
using SocialNetwork.Domain.Entities;
using SocialNetwork.Infrastructure.Data;

namespace SocialNetwork.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController :ControllerBase
{
    readonly ApplicationDbContext _dbContext;
    readonly UserManager<IdentityUser> _userManager;
    readonly SignInManager<IdentityUser> _signInManager;
    //private readonly IEmailService _emailService;

    public UserController(ApplicationDbContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _dbContext = context;
        _userManager = userManager;
        _signInManager = signInManager;
        //_emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var identityUser = new IdentityUser
        {
            UserName = user.Username,
            Email = user.Email
        };

        var result = await _userManager.CreateAsync(identityUser, "P@ssw0rd");
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        user.IdentityUserId = identityUser.Id;
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);

        var link = Url.Action("ConfirmEmail", "User",
            new { id = identityUser.Id, token },
            Request.Scheme);

        // TODO: send link via email
        return Ok(new { message = "User created. Please confirm email.", confirmLink = link });
    }
    
    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(string id, string token)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return BadRequest("Invalid user");
        
       
        var result = await _userManager.ConfirmEmailAsync(user, token);
    
        if (!result.Succeeded)
            return BadRequest("Invalid token");
    
        return Ok("Email confirmed!");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);
        if (user == null)
            return Unauthorized("Invalid credentials");

        if (!user.EmailConfirmed)
            return Unauthorized("Email not confirmed");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded)
            return Unauthorized("Invalid credentials");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsAReallyLongSuperSecretKey123456"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7253",
            audience: "https://localhost:7253",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds);

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromHeader(Name = "Authorization")] string authHeader)
    {
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return BadRequest("No token provided");

        var token = authHeader.Substring("Bearer ".Length).Trim();

        _dbContext.RevokedTokens.Add(new RevokedToken
        {
            Token = token,
            Expiration = DateTime.UtcNow.AddMinutes(30) // same as JWT expiry
        });

        await _dbContext.SaveChangesAsync();

        return Ok("Logged out successfully. Token revoked.");
    }
    [Authorize]
    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    } 
}