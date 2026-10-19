using Backend.Interfaces;
using Backend.Models;
using Npgsql;

namespace Backend.Repositories;

public class ProductRepository(NpgsqlDataSource dataSource) : IProductRepository
{
    public async Task<List<Product>> GetByCategoryAsync(int categoryId, CancellationToken cancellationToken)
    {
        var products = new List<Product>();
        await using var command = dataSource.CreateCommand("""
            SELECT id, name, price, media, reviews_count, rating, discount_percent, category_id
            FROM products WHERE category_id = $1 ORDER BY id
            """);
        command.Parameters.AddWithValue(categoryId);
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            products.Add(new Product(reader.GetInt32(0), reader.GetString(1), reader.GetDecimal(2),
                reader.GetFieldValue<string[]>(3), reader.GetInt32(4), reader.GetDecimal(5),
                reader.GetInt32(6), reader.GetInt32(7)));
        }
        return products;
    }
}
