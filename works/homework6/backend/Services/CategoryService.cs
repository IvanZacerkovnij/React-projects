using Backend.Dto;
using Backend.Models;
using Backend.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services;

public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public Task<List<Category>> GetAllAsync(CancellationToken cancellationToken)
    {
        return repository.GetAllAsync(cancellationToken);
    }

    public Task<Category> CreateAsync(CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var name = request.Name.Trim();
        if (name.Length == 0 || name.Length > 100)
        {
            throw new ValidationException("Назва категорії має містити від 1 до 100 символів.");
        }
        return repository.CreateAsync(name, cancellationToken);
    }
}
