using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Application.Interfaces;

namespace SocialNetwork.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PriorityController : ControllerBase
{
    readonly IPriorityService _priorityService;

    public PriorityController(IPriorityService priorityService)
    {
        _priorityService = priorityService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _priorityService.GetAllAsync());
    }
    
    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string name)
    {
        return Ok(await _priorityService.CreateAsync(name));
        
    }
}