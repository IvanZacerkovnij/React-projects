using Shop.Application.DTOs;
using Shop.Domain.Models;

namespace Shop.Application.Interfaces.Services;

public interface ITokenService
{
    AuthResponseDTO Create(User user);
}
