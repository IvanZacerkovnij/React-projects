using Microsoft.Extensions.Caching.Memory;

namespace Shop.Api.Services;

public class RevokedTokenStore(IMemoryCache cache)
{
    public void Revoke(string tokenId, DateTimeOffset expiresAt)
    {
        if (expiresAt > DateTimeOffset.UtcNow)
            cache.Set($"revoked-token:{tokenId}", true, expiresAt);
    }

    public bool IsRevoked(string tokenId)
    {
        return cache.TryGetValue($"revoked-token:{tokenId}", out _);
    }
}
