using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.DTOs;
using Shop.Application.Interfaces.Services;
using Shop.Api.Services;
using System.Globalization;

namespace Shop.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController(IAuthService authService, RevokedTokenStore revokedTokens) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto, CancellationToken cancellationToken)
    {
        var result = await authService.RegisterAsync(dto, cancellationToken);
        return result is null
            ? Conflict(new { message = "Користувач із таким email вже існує" })
            : Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto, CancellationToken cancellationToken)
    {
        var result = await authService.LoginAsync(dto, cancellationToken);
        return result is null
            ? Unauthorized(new { message = "Неправильний email або пароль" })
            : Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var tokenId = User.FindFirst(JwtRegisteredClaimNames.Jti)?.Value;
        var expiration = User.FindFirst(JwtRegisteredClaimNames.Exp)?.Value;
        if (string.IsNullOrEmpty(tokenId) ||
            !long.TryParse(expiration, NumberStyles.None, CultureInfo.InvariantCulture, out var expiresAt))
            return Unauthorized();

        revokedTokens.Revoke(tokenId, DateTimeOffset.FromUnixTimeSeconds(expiresAt));
        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        return Ok(new
        {
            id = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value,
            email = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value
        });
    }
}

