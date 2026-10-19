using Npgsql;

namespace Backend.Configurators;

public static class DatabaseConfigurator
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton(_ => NpgsqlDataSource.Create(
            configuration.GetConnectionString("Categories")
            ?? throw new InvalidOperationException("Connection string Categories is missing.")));
        return services;
    }

    public static async Task InitializeDatabaseAsync(this WebApplication app)
    {
        var sql = await File.ReadAllTextAsync(Path.Combine(AppContext.BaseDirectory, "Database", "Initialize.sql"));
        await using var command = app.Services.GetRequiredService<NpgsqlDataSource>().CreateCommand(sql);
        await command.ExecuteNonQueryAsync();
    }
}
