using Backend.Dto;
using Backend.Models;

namespace Backend.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync(CancellationToken cancellationToken);
    Task<Category> CreateAsync(CreateCategoryRequest request, CancellationToken cancellationToken);
}
