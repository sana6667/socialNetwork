using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SocialNetwork.Application.Dtos;
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

    public UserController(ApplicationDbContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _dbContext = context;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        // create user
        var createdUser = new IdentityUser { UserName = user.Username, Email = user.Email };
        var result = await _userManager.CreateAsync(createdUser, "P@ssw0rd");
        if (!result.Succeeded)
        {
            return BadRequest();
        }

        // add student to db
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        // generate jwt token
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7253",
            audience: "https://localhost:7253",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsAReallyLongSuperSecretKey123456")), SecurityAlgorithms.HmacSha256)
        );

        // return jwt token
        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var result = await _signInManager.PasswordSignInAsync(loginDto.Username, loginDto.Password, false, false);
        if (!result.Succeeded)
        {
            return BadRequest();
        }

        var logedInuser = await _userManager.FindByNameAsync(loginDto.Username);
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, logedInuser.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7253",
            audience: "https://localhost:7253",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsAReallyLongSuperSecretKey123456")), SecurityAlgorithms.HmacSha256)
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = DateTime.Now.AddMinutes(30),
            username = logedInuser.UserName
        });
    }

    [Authorize]
    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    } 
}