using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.DTOs;
using Shop.Application.Interfaces.Services;

namespace Shop.Api.Controllers;

[ApiController]
[Route("api/v1/products")]
public class ProductsController(IProductService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken) =>
        Ok(await service.GetAllAsync(cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var product = await service.GetByIdAsync(id, cancellationToken);
        return product is null ? NotFound() : Ok(product);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO dto, CancellationToken cancellationToken)
    {
        var product = await service.CreateAsync(dto, cancellationToken);
        if (product is null)
        {
            ModelState.AddModelError(nameof(dto.CategoryId), "Категорію не знайдено");
            return ValidationProblem(ModelState);
        }

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}
