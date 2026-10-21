using Shop.Application.DTOs;
using Shop.Application.Interfaces.Repository;
using Shop.Application.Interfaces.Services;
using Shop.Domain.Models;

namespace Shop.Application.Services;

public class ProductService(IProductRepository repository, ICategoryRepository categories) : IProductService
{
    public async Task<List<ProductDTO>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var products = await repository.GetAllAsync(cancellationToken);
        return products.Select(ToDTO).ToList();
    }

    public async Task<ProductDTO?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await repository.GetByIdAsync(id, cancellationToken);
        return product is null ? null : ToDTO(product);
    }

    public async Task<ProductDTO?> CreateAsync(CreateProductDTO dto, CancellationToken cancellationToken = default)
    {
        if (dto.CategoryId is not Guid categoryId ||
            await categories.GetByIdAsync(categoryId, cancellationToken) is null)
            return null;

        var product = new Product
        {
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            Price = decimal.Round(dto.Price, 2, MidpointRounding.AwayFromZero),
            CategoryId = categoryId
        };
        await repository.AddAsync(product, cancellationToken);
        return ToDTO(product);
    }

    private static ProductDTO ToDTO(Product product) =>
        new(product.Id, product.Name, product.Description, product.Price, product.CategoryId);
}
