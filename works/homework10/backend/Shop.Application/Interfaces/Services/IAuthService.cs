using Shop.Application.DTOs;

namespace Shop.Application.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResponseDTO?> RegisterAsync(RegisterDTO dto, CancellationToken cancellationToken = default);
    Task<AuthResponseDTO?> LoginAsync(LoginDTO dto, CancellationToken cancellationToken = default);
}

