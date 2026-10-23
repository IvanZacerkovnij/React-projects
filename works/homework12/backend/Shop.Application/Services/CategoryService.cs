using Shop.Application.DTOs;
using Shop.Application.Interfaces.Repository;
using Shop.Application.Interfaces.Services;
using Shop.Domain.Models;

namespace Shop.Application.Services;

public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<List<CategoryDTO>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await repository.GetAllAsync(cancellationToken);
        return categories.Select(category => new CategoryDTO(category.Id, category.Name)).ToList();
    }

    public async Task<CategoryDTO?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await repository.GetByIdAsync(id, cancellationToken);
        return category is null ? null : new CategoryDTO(category.Id, category.Name);
    }

    public async Task<CategoryDTO> CreateAsync(CreateCategoryDTO dto, CancellationToken cancellationToken = default)
    {
        var category = new Category { Name = dto.Name.Trim() };
        await repository.AddAsync(category, cancellationToken);
        return new CategoryDTO(category.Id, category.Name);
    }
}
