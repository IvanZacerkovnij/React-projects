FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Shop.Api/Shop.Api.csproj Shop.Api/
COPY Shop.Application/Shop.Application.csproj Shop.Application/
COPY Shop.Domain/Shop.Domain.csproj Shop.Domain/
COPY Shop.Infrastructure/Shop.Infrastructure.csproj Shop.Infrastructure/
RUN dotnet restore Shop.Api/Shop.Api.csproj
COPY . .
RUN dotnet publish Shop.Api/Shop.Api.csproj -c Release -o /app/publish --no-restore
RUN dotnet tool install --tool-path /tools dotnet-ef --version 10.0.9

FROM build AS migrations
ENTRYPOINT ["/tools/dotnet-ef", "database", "update", "--project", "Shop.Infrastructure", "--startup-project", "Shop.Api", "--configuration", "Release", "--no-build"]

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS api
WORKDIR /app
COPY --from=build /app/publish .
RUN mkdir -p /app/wwwroot/images
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Shop.Api.dll"]
