using Backend.Dto;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;

namespace Backend.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController(ICategoryService service, IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories([FromQuery] int? parentId, CancellationToken cancellationToken)
    {
        return Ok(await service.GetChildrenAsync(parentId, cancellationToken));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Category>> GetCategory(int id, CancellationToken cancellationToken)
    {
        return Ok(await service.GetByIdAsync(id, cancellationToken));
    }

    [HttpGet("{id:int}/products")]
    public async Task<ActionResult<List<Product>>> GetProducts(int id, CancellationToken cancellationToken)
    {
        return Ok(await productService.GetByCategoryAsync(id, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await service.CreateAsync(request, cancellationToken);
        return StatusCode(StatusCodes.Status201Created, category);
    }
}
