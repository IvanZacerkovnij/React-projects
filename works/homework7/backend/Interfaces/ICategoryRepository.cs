using Backend.Models;

namespace Backend.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetChildrenAsync(int? parentId, CancellationToken cancellationToken);
    Task<Category?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<Category> CreateAsync(string name, int? parentId, CancellationToken cancellationToken);
}
