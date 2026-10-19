using Backend.Models;
using Backend.Interfaces;
using Npgsql;

namespace Backend.Repositories;

public class CategoryRepository(NpgsqlDataSource dataSource) : ICategoryRepository
{
    public async Task<List<Category>> GetChildrenAsync(int? parentId, CancellationToken cancellationToken)
    {
        var categories = new List<Category>();
        await using var command = dataSource.CreateCommand("SELECT id, name, parent_id FROM categories WHERE parent_id IS NOT DISTINCT FROM $1 ORDER BY id");
        command.Parameters.Add(new NpgsqlParameter { NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Integer, Value = (object?)parentId ?? DBNull.Value });
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            categories.Add(new Category(reader.GetInt32(0), reader.GetString(1), reader.IsDBNull(2) ? null : reader.GetInt32(2)));
        }
        return categories;
    }

    public async Task<Category?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        await using var command = dataSource.CreateCommand("SELECT id, name, parent_id FROM categories WHERE id = $1");
        command.Parameters.AddWithValue(id);
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        return await reader.ReadAsync(cancellationToken)
            ? new Category(reader.GetInt32(0), reader.GetString(1), reader.IsDBNull(2) ? null : reader.GetInt32(2))
            : null;
    }

    public async Task<Category> CreateAsync(string name, int? parentId, CancellationToken cancellationToken)
    {
        await using var command = dataSource.CreateCommand("INSERT INTO categories (name, parent_id) VALUES ($1, $2) RETURNING id");
        command.Parameters.AddWithValue(name);
        command.Parameters.Add(new NpgsqlParameter { NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Integer, Value = (object?)parentId ?? DBNull.Value });
        var id = (int)(await command.ExecuteScalarAsync(cancellationToken))!;
        return new Category(id, name, parentId);
    }
}
