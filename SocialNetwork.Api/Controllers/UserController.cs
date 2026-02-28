using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    readonly UserManager<User> _userManager;
    readonly SignInManager<User> _signInManager;
    readonly IConfiguration _config;
    readonly IEmailService _emailService;
    readonly IUserService _userService;
    readonly RoleManager<IdentityRole> _roleManager;

    public UserController(ApplicationDbContext context, 
        UserManager<User> userManager, 
        SignInManager<User> signInManager,
        IConfiguration config, IEmailService emailService,
        IUserService userService, RoleManager<IdentityRole> roleManager)
    {
        _dbContext = context;
        _userManager = userManager;
        _signInManager = signInManager;
        _config = config;
        _emailService = emailService;
        _userService = userService;
        _roleManager = roleManager;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (string.IsNullOrWhiteSpace(registerDto.Username))
        {
            return BadRequest("Email or phone is required");
        }

        var user = new User
        {
            UserName = registerDto.Username,
            PhoneNumber = registerDto.Username.Contains("@")? null:registerDto.Username,
            Email = registerDto.Username.Contains("@")? registerDto.Username:null,
            Name = registerDto.Name,
            City = registerDto.City
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);
        
        
        foreach (var interestId in registerDto.InterestIds.Distinct())
        {
            _dbContext.UserInterests.Add(new UserInterest
            {
                UserId = user.Id,
                InterestId = interestId
            });
        }

        foreach (var priorityId in registerDto.PriorityIds.Distinct())
        {
            _dbContext.UserPriorities.Add(new UserPriority
            {
                UserId = user.Id,
                PriorityId = priorityId
            });
           
        }

        await _dbContext.SaveChangesAsync();
        
        
        await _userManager.AddToRoleAsync(user, "User");

        if(user.Email != null)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);


            var link = Url.Action("ConfirmEmail", "User",
                new { id = user.Id, token },
                Request.Scheme);
            
            return Ok(new { message = "User created. Please confirm email.", confirmLink = link });
        }

        // TODO: send link via email
        return Ok(new { message = "User created "});
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
    public async Task<IActionResult> Login(string username, string password)
    {
        User? user = null;

        if (username.Contains("@"))
        {
            user = await _userManager.FindByEmailAsync(username);
        }
        else
        {
            user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber==username);
            
        }

        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }
        

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid credentials");
        }
        
        user.LastActiveAt = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        var roles = await _userManager.GetRolesAsync(user);
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));
        
        var jwt = _config.GetSection("Jwt");
        var getKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(getKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(jwt["ExpireMinutes"])),
            signingCredentials: creds);

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }
    
    [Authorize]
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
    
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return Ok(); // don't reveal if user exists

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var link = Url.Action(
            "ResetPassword",
            "User",
            new { email = user.Email, token },
            Request.Scheme);

        // send email
        // await _emailService.SendAsync(
        //     user.Email!,
        //     "Reset password",
        //     $"Click here: {link}"
        // );

        return Ok(new {message = "Reset link sent",
                resetLink = link,
                //generatedToken = token
        });
    }
    
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(
        string email,
        string token,
        string newPassword)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return BadRequest("Invalid user");

        var result = await _userManager.ResetPasswordAsync(
            user,
            token,
            newPassword);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Password changed successfully");
    }
    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(string oldPassword, string newPassword)
    {
        var user = await _userManager.GetUserAsync(User);

        var result = await _userManager.ChangePasswordAsync(
            user,
            oldPassword,
            newPassword);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Password changed");
    }

    [Authorize]
    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadProfileImage(IFormFile file)
    {
        var fileName = $"{Guid.NewGuid()}.jpg";
        var path = Path.Combine("wwwroot/images", fileName);
        using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);
        var url = $"{Request.Scheme}{Request.Host}/images/{fileName}";
        
       
        var user = await _userManager.GetUserAsync(User);
        user.ImageUrl = url;
        await _userManager.UpdateAsync(user);
        return Ok(url);
    }


    [HttpPut("location")]
    public async Task<IActionResult> UpdateLocation(double lat, double lon, CancellationToken ct)
    {
        if (lat is < -90 or > 90 || lon is < -180 or > 180)
        {
            return BadRequest("Invalid coordinates");
        }
        
        
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var latR = Math.Round(lat, 2);
        var lonR = Math.Round(lon, 2);
        
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, ct);
        user.LatRounded = latR;
        user.LngRounded = lonR;
        user.LocationUpdatedAt = DateTime.UtcNow;
        user.LastActiveAt = DateTime.UtcNow;
        
        await _dbContext.SaveChangesAsync(ct);
        return Ok(new { lat = latR, lon = lonR });
    }
    
    
    

    // [Authorize]
    // [HttpPost("set-interests")]
    // public async Task<IActionResult> SetInterests(List<int> interestIds)
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //     await _userService.SetInterestsAsync(userId, interestIds);
    //     return Ok();
    // }
    
    // [Authorize]
    // [HttpPost("set-priorities")]
    // public async Task<IActionResult> SetPrioriries(List<int> priorityIds)
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //     await _userService.SetPrioritiesAsync(userId, priorityIds);
    //     return Ok();
    // }
    
    [Authorize(Roles = "Admin")]
    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    } 
}