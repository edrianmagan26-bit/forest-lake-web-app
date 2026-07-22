-- Run this if you already created the burial_lots table without image columns
ALTER TABLE burial_lots ADD COLUMN image VARCHAR(255) DEFAULT NULL AFTER description;
ALTER TABLE burial_lots ADD COLUMN image_type ENUM('photo', '360') DEFAULT 'photo' AFTER image;

-- Lot images table (multiple images per lot)
CREATE TABLE IF NOT EXISTS lot_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    burial_lot_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    image_type ENUM('photo', '360') DEFAULT 'photo',
    caption VARCHAR(255) DEFAULT '',
    sort_order INT DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (burial_lot_id) REFERENCES burial_lots(id) ON DELETE CASCADE
) ENGINE=InnoDB;
