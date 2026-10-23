using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Shop.Application.DTOs;
using Shop.Application.Interfaces.Services;
using Shop.Domain.Models;

namespace Shop.Api.Services;

public class TokenService(SigningCredentials signingCredentials, IConfiguration configuration) : ITokenService
{
    public AuthResponseDTO Create(User user)
    {
        var expiresAt = DateTime.UtcNow.AddMinutes(15);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: signingCredentials);

        return new AuthResponseDTO(new JwtSecurityTokenHandler().WriteToken(token), expiresAt, user.Email);
    }
}
