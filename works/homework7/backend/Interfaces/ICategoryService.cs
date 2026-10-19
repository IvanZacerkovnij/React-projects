using Backend.Dto;
using Backend.Models;

namespace Backend.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetChildrenAsync(int? parentId, CancellationToken cancellationToken);
    Task<Category> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<Category> CreateAsync(CreateCategoryRequest request, CancellationToken cancellationToken);
}
