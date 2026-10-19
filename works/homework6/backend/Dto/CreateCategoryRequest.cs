using System.ComponentModel.DataAnnotations;

namespace Backend.Dto;

public class CreateCategoryRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
}
