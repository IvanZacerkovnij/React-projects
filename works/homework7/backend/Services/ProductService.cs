using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services;

public class ProductService(IProductRepository repository, ICategoryService categoryService) : IProductService
{
    public async Task<List<Product>> GetByCategoryAsync(int categoryId, CancellationToken cancellationToken)
    {
        await categoryService.GetByIdAsync(categoryId, cancellationToken);
        return await repository.GetByCategoryAsync(categoryId, cancellationToken);
    }
}
