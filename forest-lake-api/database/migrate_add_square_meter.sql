-- Add square_meter column to burial_lots table
ALTER TABLE burial_lots ADD COLUMN square_meter DECIMAL(10, 2) DEFAULT NULL AFTER block;
