-- Migration: Add deceased information table
USE forest_lake_sumag;

CREATE TABLE IF NOT EXISTS deceased_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    burial_lot_id INT NOT NULL,
    reservation_id INT DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE DEFAULT NULL,
    date_of_death DATE DEFAULT NULL,
    relationship_to_client VARCHAR(100) DEFAULT NULL,
    burial_date DATE DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (burial_lot_id) REFERENCES burial_lots(id) ON DELETE CASCADE,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE SET NULL
) ENGINE=InnoDB;
