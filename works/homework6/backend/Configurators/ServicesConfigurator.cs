using Backend.Exceptions;
using Backend.Interfaces;
using Backend.Repositories;
using Backend.Services;

namespace Backend.Configurators;

public static class ServicesConfigurator
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddProblemDetails();
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddCors(options => options.AddDefaultPolicy(policy =>
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));
        services.AddOpenApi();
        return services;
    }
}
