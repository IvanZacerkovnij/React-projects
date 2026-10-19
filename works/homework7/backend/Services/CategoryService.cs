using Backend.Dto;
using Backend.Models;
using Backend.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services;

public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<List<Category>> GetChildrenAsync(int? parentId, CancellationToken cancellationToken)
    {
        if (parentId.HasValue)
        {
            await GetByIdAsync(parentId.Value, cancellationToken);
        }
        return await repository.GetChildrenAsync(parentId, cancellationToken);
    }

    public async Task<Category> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await repository.GetByIdAsync(id, cancellationToken)
            ?? throw new KeyNotFoundException("Категорію не знайдено.");
    }

    public async Task<Category> CreateAsync(CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var name = request.Name.Trim();
        if (name.Length == 0 || name.Length > 100)
        {
            throw new ValidationException("Назва категорії має містити від 1 до 100 символів.");
        }
        if (request.ParentId.HasValue)
        {
            await GetByIdAsync(request.ParentId.Value, cancellationToken);
        }
        return await repository.CreateAsync(name, request.ParentId, cancellationToken);
    }
}
