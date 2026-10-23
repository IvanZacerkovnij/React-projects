namespace Shop.Api.Configurators;

public static class CorsConfigurator
{
    public const string FrontendPolicy = "Frontend";

    public static IServiceCollection AddFrontendCors(this IServiceCollection services)
    {
        services.AddCors(options =>
            options.AddPolicy(FrontendPolicy, policy =>
                policy.WithOrigins("http://localhost:5176").AllowAnyHeader().AllowAnyMethod()));
        return services;
    }
}
