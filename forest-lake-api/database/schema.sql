-- Forest Lake Sum-ag Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS forest_lake_sumag;
USE forest_lake_sumag;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    status ENUM('active', 'inactive', 'unverified') NOT NULL DEFAULT 'unverified',
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Client profiles
CREATE TABLE IF NOT EXISTS client_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) DEFAULT '',
    last_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Burial lots
CREATE TABLE IF NOT EXISTS burial_lots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lot_number VARCHAR(50) NOT NULL UNIQUE,
    section VARCHAR(100) NOT NULL,
    block VARCHAR(50) NOT NULL,
    square_meter DECIMAL(10, 2) DEFAULT NULL,
    latitude DECIMAL(10, 6) DEFAULT NULL,
    longitude DECIMAL(10, 6) DEFAULT NULL,
    status ENUM('available', 'reserved', 'occupied') NOT NULL DEFAULT 'available',
    description TEXT DEFAULT '',
    image VARCHAR(255) DEFAULT NULL,
    image_type ENUM('photo', '360') DEFAULT 'photo',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    burial_lot_id INT NOT NULL,
    reservation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'declined', 'cancelled') NOT NULL DEFAULT 'pending',
    admin_remarks TEXT DEFAULT '',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (burial_lot_id) REFERENCES burial_lots(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Email verifications
CREATE TABLE IF NOT EXISTS email_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    verified_at DATETIME DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- User tokens (for authentication)
CREATE TABLE IF NOT EXISTS user_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- System logs
CREATE TABLE IF NOT EXISTS system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT DEFAULT '',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert default admin account (password: admin123)
INSERT INTO users (email, password, role, status, email_verified, created_at, updated_at)
VALUES ('admin@forestlake.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active', 1, NOW(), NOW());

-- Insert sample burial lots (spread across visible cemetery sections)
INSERT INTO burial_lots (lot_number, section, block, latitude, longitude, status, description) VALUES
-- Upper left green section (Garden A)
('A-101', 'Garden A', '1', 10.60330, 122.93380, 'available', 'Upper left block, near main path'),
('A-102', 'Garden A', '2', 10.60320, 122.93400, 'available', 'Upper left block, center area'),
('A-103', 'Garden A', '3', 10.60310, 122.93350, 'occupied', 'Upper left block, west side'),
('A-104', 'Garden A', '4', 10.60340, 122.93420, 'available', 'Upper left block, east corner'),
-- Lower left green section (Garden B)
('B-101', 'Garden B', '1', 10.60260, 122.93360, 'available', 'Lower left section, near entrance'),
('B-102', 'Garden B', '2', 10.60250, 122.93390, 'reserved', 'Lower left section, center'),
('B-103', 'Garden B', '3', 10.60270, 122.93410, 'available', 'Lower left section, east side'),
-- Upper right section (Garden C)
('C-101', 'Garden C', '1', 10.60330, 122.93480, 'available', 'Upper right section, north area'),
('C-102', 'Garden C', '2', 10.60310, 122.93500, 'occupied', 'Upper right section, center'),
('C-103', 'Garden C', '3', 10.60300, 122.93520, 'available', 'Upper right section, east side'),
-- Lower right section (Garden D)
('D-101', 'Garden D', '1', 10.60250, 122.93470, 'available', 'Lower right section, west side'),
('D-102', 'Garden D', '2', 10.60240, 122.93500, 'reserved', 'Lower right section, center'),
('D-103', 'Garden D', '3', 10.60230, 122.93530, 'available', 'Lower right section, south corner'),
('D-104', 'Garden D', '4', 10.60260, 122.93540, 'available', 'Lower right section, east path');
