-- Migration: Add OTP codes table
USE forest_lake_sumag;

CREATE TABLE IF NOT EXISTS otp_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    type ENUM('verification', 'reset') NOT NULL DEFAULT 'verification',
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email_type (email, type)
) ENGINE=InnoDB;
