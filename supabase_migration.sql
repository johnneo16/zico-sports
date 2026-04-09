-- 1. Add category column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Boots';

-- 2. Ensure all existing products are marked as Boots
UPDATE products SET category = 'Boots' WHERE category IS NULL;

-- 3. Insert sample Jersey data
INSERT INTO products (name, brand, price, original_price, description, stock, rating, reviews, hot, image, category)
VALUES 
('Argentina 24/25 Home Jersey', 'Adidas', 4999, 5999, 'The official Argentina home jersey with MESSI 10 on the back. Premium B&W edition.', 50, 5.0, 120, true, '/messi_jersey_bw.png', 'Jerseys'),
('Al-Nassr 24/25 Away Jersey', 'Nike', 4499, 4999, 'Limited professional edition B&W jersey with RONALDO 7. Breathable performance fabric.', 30, 4.9, 85, true, '/ronaldo_jersey_bw.png', 'Jerseys'),
('Real Madrid 24/25 Home Jersey', 'Adidas', 5299, 6499, 'The new era begins. MBAPPE 10 home jersey in cinematic high-contrast B&W.', 45, 4.8, 210, true, '/mbappe_jersey_bw.png', 'Jerseys'),
('Zico Elite Training Kit', 'Puma', 2499, 2999, 'Professional grade training jersey for high-intensity performance. Minimalist B&W design.', 100, 4.7, 45, false, '/training_jersey_bw.png', 'Jerseys');
