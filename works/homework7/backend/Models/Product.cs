namespace Backend.Models;

public record Product(int Id, string Name, decimal Price, string[] Media,
    int ReviewsCount, decimal Rating, int DiscountPercent, int CategoryId);
