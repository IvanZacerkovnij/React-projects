FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Shop.Api/Shop.Api.csproj Shop.Api/
COPY Shop.Application/Shop.Application.csproj Shop.Application/
COPY Shop.Domain/Shop.Domain.csproj Shop.Domain/
COPY Shop.Infrastructure/Shop.Infrastructure.csproj Shop.Infrastructure/
RUN dotnet restore Shop.Api/Shop.Api.csproj
COPY . .
RUN dotnet publish Shop.Api/Shop.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS api
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_HTTP_PORTS=8080
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Shop.Api.dll"]
