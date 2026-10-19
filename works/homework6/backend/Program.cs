using Backend.Configurators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices();
builder.Services.AddDatabase(builder.Configuration);

var app = builder.Build();
app.ConfigurePipeline();
await app.InitializeDatabaseAsync();

app.Run();
