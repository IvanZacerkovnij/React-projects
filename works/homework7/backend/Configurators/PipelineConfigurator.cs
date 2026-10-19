namespace Backend.Configurators;

public static class PipelineConfigurator
{
    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        app.UseExceptionHandler();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseCors();
        app.UseAuthorization();
        app.MapControllers();
        return app;
    }
}
