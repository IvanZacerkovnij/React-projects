using Backend.Models;

namespace Backend.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync(CancellationToken cancellationToken);
    Task<Category> CreateAsync(string name, CancellationToken cancellationToken);
}
