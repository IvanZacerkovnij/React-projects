namespace Shop.Application.DTOs;

public record AuthResponseDTO(string AccessToken, DateTime ExpiresAt, string Email);

