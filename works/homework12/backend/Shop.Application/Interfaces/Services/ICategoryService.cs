using Shop.Application.DTOs;

namespace Shop.Application.Interfaces.Services;

public interface ICategoryService
{
    Task<List<CategoryDTO>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<CategoryDTO?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CategoryDTO> CreateAsync(CreateCategoryDTO dto, CancellationToken cancellationToken = default);
}
