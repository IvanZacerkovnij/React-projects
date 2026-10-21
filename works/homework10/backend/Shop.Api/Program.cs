using Shop.Api.Configurators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddFrontendCors();

var app = builder.Build();

if (args.Contains("--initialize-database"))
{
    await app.InitializeDatabaseAsync();
    return;
}

app.UseCors(CorsConfigurator.FrontendPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
