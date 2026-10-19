using Backend.Models;

namespace Backend.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetByCategoryAsync(int categoryId, CancellationToken cancellationToken);
}
