using Shop.Domain.Models;

namespace Shop.Application.Interfaces.Repository;

public interface IAuthRepository
{
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task AddAsync(User user, CancellationToken cancellationToken = default);
}

