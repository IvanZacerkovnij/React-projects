using Backend.Models;

namespace Backend.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetByCategoryAsync(int categoryId, CancellationToken cancellationToken);
}
