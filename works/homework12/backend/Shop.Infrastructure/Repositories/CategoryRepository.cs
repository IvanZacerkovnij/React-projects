using Microsoft.EntityFrameworkCore;
using Shop.Application.Interfaces.Repository;
using Shop.Domain.Models;
using Shop.Infrastructure.Data;

namespace Shop.Infrastructure.Repositories;

public class CategoryRepository(ShopDbContext context) : ICategoryRepository
{
    public Task<List<Category>> GetAllAsync(CancellationToken cancellationToken = default) =>
        context.Categories.AsNoTracking().OrderBy(category => category.Name).ToListAsync(cancellationToken);

    public Task<Category?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        context.Categories.AsNoTracking().SingleOrDefaultAsync(category => category.Id == id, cancellationToken);

    public async Task AddAsync(Category category, CancellationToken cancellationToken = default)
    {
        context.Categories.Add(category);
        await context.SaveChangesAsync(cancellationToken);
    }
}
