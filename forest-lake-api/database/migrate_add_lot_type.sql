-- Add lot_type column to burial_lots table
ALTER TABLE burial_lots ADD COLUMN lot_type ENUM('lawn', 'mini_mausoleum', 'estate', 'legacy') DEFAULT 'lawn' AFTER square_meter;
