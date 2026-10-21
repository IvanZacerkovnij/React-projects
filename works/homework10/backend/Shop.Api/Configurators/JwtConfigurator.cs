using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Shop.Api.Services;

namespace Shop.Api.Configurators;

public static class JwtConfigurator
{
    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtKey = configuration["Jwt:Key"];
        if (string.IsNullOrWhiteSpace(jwtKey) || Encoding.UTF8.GetByteCount(jwtKey) < 32)
            throw new InvalidOperationException("Set Jwt:Key to a secret of at least 32 bytes using user-secrets or Jwt__Key.");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        services.AddSingleton(new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256));
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.MapInboundClaims = false;
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = ValidateTokenAsync
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = securityKey,
                    ValidAlgorithms = [SecurityAlgorithms.HmacSha256],
                    ClockSkew = TimeSpan.Zero
                };
            });
        services.AddAuthorization();
        return services;
    }

    private static Task ValidateTokenAsync(TokenValidatedContext context)
    {
        var tokenId = context.Principal?.FindFirst(JwtRegisteredClaimNames.Jti)?.Value;
        var revokedTokens = context.HttpContext.RequestServices.GetRequiredService<RevokedTokenStore>();
        if (string.IsNullOrEmpty(tokenId) || revokedTokens.IsRevoked(tokenId))
            context.Fail("Token has been revoked or has no identifier.");

        return Task.CompletedTask;
    }
}
