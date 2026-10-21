using System.ComponentModel.DataAnnotations;

namespace Shop.Application.DTOs;

public class CreateCategoryDTO
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;
}
