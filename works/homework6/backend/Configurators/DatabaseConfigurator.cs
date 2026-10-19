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
        await using var command = app.Services.GetRequiredService<NpgsqlDataSource>().CreateCommand(
            "CREATE TABLE IF NOT EXISTS categories (id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name varchar(100) NOT NULL CHECK (length(trim(name)) > 0))");
        await command.ExecuteNonQueryAsync();
    }
}
