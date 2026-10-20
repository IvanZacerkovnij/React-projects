SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRANSACTION;

DECLARE @categories TABLE (slug nvarchar(100), name nvarchar(100), parent_slug nvarchar(100));
INSERT INTO @categories VALUES
('demo-electronics', N'Електроніка', NULL),
('demo-books', N'Книги', NULL),
('demo-clothing', N'Одяг', NULL),
('demo-shoes', N'Взуття', NULL),
('demo-home', N'Дім і затишок', NULL),
('demo-garden', N'Сад і город', NULL),
('demo-sports', N'Спорт', NULL),
('demo-toys', N'Іграшки', NULL),
('demo-beauty', N'Краса та догляд', NULL),
('demo-auto', N'Автотовари', NULL),
('demo-pets', N'Товари для тварин', NULL),
('demo-office', N'Канцелярія', NULL),
('demo-travel', N'Подорожі', NULL),
('demo-music', N'Музика', NULL),
('demo-kitchen', N'Кухня', NULL),
('demo-empty', N'Порожня категорія', NULL),
('demo-phones', N'Смартфони', 'demo-electronics'),
('demo-laptops', N'Ноутбуки', 'demo-electronics'),
('demo-tablets', N'Планшети', 'demo-electronics'),
('demo-monitors', N'Монітори', 'demo-electronics'),
('demo-keyboards', N'Клавіатури', 'demo-electronics'),
('demo-mice', N'Миші', 'demo-electronics'),
('demo-headphones', N'Навушники', 'demo-electronics'),
('demo-speakers', N'Колонки', 'demo-electronics'),
('demo-cameras', N'Камери', 'demo-electronics'),
('demo-watches', N'Смартгодинники', 'demo-electronics'),
('demo-chargers', N'Зарядні пристрої', 'demo-electronics'),
('demo-cables', N'Кабелі', 'demo-electronics'),
('demo-phones-budget', N'Бюджетні смартфони', 'demo-phones'),
('demo-phones-premium', N'Флагманські смартфони', 'demo-phones'),
('demo-phones-foldable', N'Складані смартфони', 'demo-phones');

DECLARE @level int = 0;
WHILE @level < 3
BEGIN
    INSERT INTO categories (name, slug, parent_id, url, is_active, created_at, updated_at)
    SELECT source.name, source.slug, parent.id,
        N'4586ecb3-f2ab-412b-9f85-a3f6198aac63.webp', 1, SYSUTCDATETIME(), SYSUTCDATETIME()
    FROM @categories source
    LEFT JOIN categories parent ON parent.slug = source.parent_slug
    WHERE (source.parent_slug IS NULL OR parent.id IS NOT NULL)
      AND NOT EXISTS (SELECT 1 FROM categories existing WHERE existing.slug = source.slug);
    SET @level += 1;
END;

INSERT INTO products (name, description, price, stock_qty, is_active, category_id, created_at, updated_at)
SELECT category.name + variant.suffix,
    N'Демонстраційний товар для перевірки каталогу. Категорія: ' + category.name + N'.',
    variant.price, variant.stock, 1, category.id, SYSUTCDATETIME(), SYSUTCDATETIME()
FROM categories category
JOIN @categories demo ON demo.slug = category.slug
CROSS JOIN (VALUES
    (N' — Стандарт', CAST(499.90 AS decimal(18,2)), 15),
    (N' — Преміум', CAST(2499.00 AS decimal(18,2)), 3),
    (N' — Лімітована серія', CAST(9999.99 AS decimal(18,2)), 0)
) variant(suffix, price, stock)
WHERE category.slug <> 'demo-empty'
  AND NOT EXISTS (SELECT 1 FROM categories child WHERE child.parent_id = category.id)
  AND NOT EXISTS (
      SELECT 1 FROM products existing
      WHERE existing.category_id = category.id AND existing.name = category.name + variant.suffix
  );

INSERT INTO product_images (url, is_primary, product_id, created_at, updated_at)
SELECT N'5ef22750-91c0-4e83-b9d0-e19508c639d4.webp', 1, product.id, SYSUTCDATETIME(), SYSUTCDATETIME()
FROM products product
JOIN categories category ON category.id = product.category_id
JOIN @categories demo ON demo.slug = category.slug
WHERE product.description LIKE N'Демонстраційний товар для перевірки каталогу.%'
  AND NOT EXISTS (SELECT 1 FROM product_images image WHERE image.product_id = product.id);

COMMIT TRANSACTION;

SELECT COUNT(*) AS demo_categories FROM categories category JOIN @categories demo ON demo.slug = category.slug;
SELECT COUNT(*) AS demo_products FROM products product JOIN categories category ON category.id = product.category_id
JOIN @categories demo ON demo.slug = category.slug
WHERE product.description LIKE N'Демонстраційний товар для перевірки каталогу.%';
