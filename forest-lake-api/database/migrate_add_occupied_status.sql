-- Migration: Add 'occupied' status to reservations
USE forest_lake_sumag;

ALTER TABLE reservations MODIFY COLUMN status ENUM('pending', 'approved', 'declined', 'cancelled', 'occupied') NOT NULL DEFAULT 'pending';
