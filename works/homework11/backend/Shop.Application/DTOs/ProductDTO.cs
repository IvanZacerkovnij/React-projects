namespace Shop.Application.DTOs;

public record ProductDTO(Guid Id, string Name, string? Description, decimal Price, Guid CategoryId);
