using System.ComponentModel.DataAnnotations;

namespace Shop.Application.DTOs;

public class CreateProductDTO
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Range(typeof(decimal), "0.01", "9999999999.99", ParseLimitsInInvariantCulture = true)]
    public decimal Price { get; set; }

    [Required]
    public Guid? CategoryId { get; set; }
}
