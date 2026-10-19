using Backend.Models;
using Backend.Interfaces;
using Npgsql;

namespace Backend.Repositories;

public class CategoryRepository(NpgsqlDataSource dataSource) : ICategoryRepository
{
    public async Task<List<Category>> GetAllAsync(CancellationToken cancellationToken)
    {
        var categories = new List<Category>();
        await using var command = dataSource.CreateCommand("SELECT id, name FROM categories ORDER BY id");
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            categories.Add(new Category(reader.GetInt32(0), reader.GetString(1)));
        }
        return categories;
    }

    public async Task<Category> CreateAsync(string name, CancellationToken cancellationToken)
    {
        await using var command = dataSource.CreateCommand("INSERT INTO categories (name) VALUES ($1) RETURNING id");
        command.Parameters.AddWithValue(name);
        var id = (int)(await command.ExecuteScalarAsync(cancellationToken))!;
        return new Category(id, name);
    }
}
