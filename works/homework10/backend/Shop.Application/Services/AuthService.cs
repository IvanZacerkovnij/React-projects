using Shop.Application.DTOs;
using Shop.Application.Interfaces.Repository;
using Shop.Application.Interfaces.Services;
using Shop.Domain.Models;

namespace Shop.Application.Services;

public class AuthService(IAuthRepository repository, IPasswordHasher passwordHasher, ITokenService tokenService) : IAuthService
{
    public async Task<AuthResponseDTO?> RegisterAsync(RegisterDTO dto, CancellationToken cancellationToken = default)
    {
        var email = dto.Email.Trim().ToLowerInvariant();
        if (await repository.GetByEmailAsync(email, cancellationToken) is not null)
            return null;

        var user = new User { Email = email, PasswordHash = passwordHasher.Hash(dto.Password) };
        await repository.AddAsync(user, cancellationToken);
        return tokenService.Create(user);
    }

    public async Task<AuthResponseDTO?> LoginAsync(LoginDTO dto, CancellationToken cancellationToken = default)
    {
        var user = await repository.GetByEmailAsync(dto.Email.Trim().ToLowerInvariant(), cancellationToken);
        if (user is null || !passwordHasher.Verify(dto.Password, user.PasswordHash))
            return null;

        return tokenService.Create(user);
    }
}

