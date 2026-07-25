-- Migration: Add max_slots column to burial_lots
USE forest_lake_sumag;

ALTER TABLE burial_lots ADD COLUMN max_slots INT NOT NULL DEFAULT 8 AFTER square_meter;
