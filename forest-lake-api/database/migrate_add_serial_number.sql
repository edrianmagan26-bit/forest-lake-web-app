-- Migration: Add serial_number to reservations
USE forest_lake_sumag;

ALTER TABLE reservations ADD COLUMN serial_number VARCHAR(20) UNIQUE DEFAULT NULL AFTER id;
