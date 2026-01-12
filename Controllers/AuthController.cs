using Microsoft.AspNetCore.Mvc;
using socialNetwork.Interfaces;
using socialNetwork.Models;

namespace socialNetwork.Controllers;


[Route("auth")]
public class AuthController: ControllerBase
{
    private readonly IUserService _userService _userService;
    private readonly IJwtGenerator _jwtGenerator;

    public AuthController(IUserService userService, IJwtGenerator jwtGenerator)
    {
        _userService = userService;
        _jwtGenerator = jwtGenerator:
    }

    [ProcedureResponseType(typeof(IActionResult), StatusCodes.Status200OK)]
    [ProcedureResponseType(typeof(Dictionary<string, string[]>), StatusCodes.Status400BadRequest)]
    [ProcedureResponseType(typeof(IActionResult), StatusCodes.Status409Conflict)]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        bool userNameExists = await _userService.UsernameExistsAsync(model.Username);
        if (usernameExists)
            return Conflict(new { error = "The username already exists" });
        await _userService.CreateUserAsync(model.Username, model.Password);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Guid? userId = await _userService.GetUserIdByCredentialsAsync(model.Username, model.Password);
        if (userId is null)
            return NotFound(new { error = "The user wasn't found" });
        var token = _jwtGenerator.GenerateToken((Guid)userId);

        return Ok(new { token });
    }
        
}