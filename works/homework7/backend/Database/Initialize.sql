BEGIN;
CREATE TABLE IF NOT EXISTS categories (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar(100) NOT NULL CHECK (length(trim(name)) > 0)
);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id integer REFERENCES categories(id);
CREATE INDEX IF NOT EXISTS categories_parent_id_idx ON categories(parent_id);
CREATE TABLE IF NOT EXISTS products (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar(100) NOT NULL CHECK (length(trim(name)) > 0),
    price numeric(12, 2) NOT NULL CHECK (price >= 0),
    media text[] NOT NULL DEFAULT '{}',
    reviews_count integer NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
    rating numeric(2, 1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
    discount_percent integer NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
    category_id integer NOT NULL REFERENCES categories(id)
);
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE TABLE IF NOT EXISTS homework7_migrations (name text PRIMARY KEY);
DO $$
DECLARE
    electronics_id integer;
    home_id integer;
    audio_id integer;
    headphones_id integer;
    speakers_id integer;
    kitchen_id integer;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM homework7_migrations WHERE name = 'demo-data-v1') THEN
        INSERT INTO categories (name) VALUES ('Електроніка') RETURNING id INTO electronics_id;
        INSERT INTO categories (name) VALUES ('Дім') RETURNING id INTO home_id;
        INSERT INTO categories (name, parent_id) VALUES ('Аудіо', electronics_id) RETURNING id INTO audio_id;
        INSERT INTO categories (name, parent_id) VALUES ('Навушники', audio_id) RETURNING id INTO headphones_id;
        INSERT INTO categories (name, parent_id) VALUES ('Колонки', audio_id) RETURNING id INTO speakers_id;
        INSERT INTO categories (name, parent_id) VALUES ('Кухня', home_id) RETURNING id INTO kitchen_id;
        INSERT INTO products (name, price, reviews_count, rating, discount_percent, category_id) VALUES
            ('wireless headphones', 2500, 10, 4.2, 15, headphones_id),
            ('Bluetooth headphones Pro', 3200, 18, 4.7, 10, headphones_id),
            ('Wireless earbuds Mini', 1800, 7, 4.5, 0, headphones_id),
            ('Портативна колонка', 1500, 5, 4.6, 0, speakers_id),
            ('Електрочайник', 1200, 3, 4.3, 5, kitchen_id);
        INSERT INTO homework7_migrations (name) VALUES ('demo-data-v1');
    END IF;
END $$;
COMMIT;
