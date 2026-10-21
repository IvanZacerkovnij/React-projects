using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Shop.Application.DTOs;

public class RegisterDTO
{
    [Required, EmailAddress, MaxLength(254)]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8), MaxLength(128)]
    public string Password { get; set; } = string.Empty;

    [Required, Compare(nameof(Password))]
    [JsonPropertyName("repeat_password")]
    public string RepeatPassword { get; set; } = string.Empty;
}

