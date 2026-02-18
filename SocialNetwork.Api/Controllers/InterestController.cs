using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;

namespace SocialNetwork.Api.Controllers;


[ApiController]
[Route("api/interests")]
public class InterestController : ControllerBase
{
    readonly IInterestService _interestService;

    public InterestController(IInterestService interestService)
    {
        _interestService = interestService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _interestService.GetAllAsync());
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string name)
    {
        return Ok(await _interestService.CreateAsync(name));
        
    }
    
    
}

