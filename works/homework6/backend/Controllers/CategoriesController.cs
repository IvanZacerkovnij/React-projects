using Backend.Dto;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;

namespace Backend.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController(ICategoryService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories(CancellationToken cancellationToken)
    {
        return Ok(await service.GetAllAsync(cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await service.CreateAsync(request, cancellationToken);
        return StatusCode(StatusCodes.Status201Created, category);
    }
}
