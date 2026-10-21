using Shop.Application.DTOs;

namespace Shop.Application.Interfaces.Services;

public interface IProductService
{
    Task<List<ProductDTO>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ProductDTO?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProductDTO?> CreateAsync(CreateProductDTO dto, CancellationToken cancellationToken = default);
}
