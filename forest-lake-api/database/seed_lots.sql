-- Seed burial lots for all blocks and sections (10 lots per section)
-- Clear existing lots
DELETE FROM reservations;
DELETE FROM burial_lots;

-- Reset auto increment
ALTER TABLE burial_lots AUTO_INCREMENT = 1;

INSERT INTO burial_lots (lot_number, section, block, square_meter, latitude, longitude, status, description) VALUES
-- === ASTER ESTATE A ===
-- Section A (10 lots)
('A-001', 'A', 'Aster Estate A', 2.50, 10.602855, 122.933750, 'available', 'Section A, Lot 1'),
('A-002', 'A', 'Aster Estate A', 2.50, 10.602880, 122.933800, 'available', 'Section A, Lot 2'),
('A-003', 'A', 'Aster Estate A', 2.50, 10.602910, 122.933850, 'occupied', 'Section A, Lot 3'),
('A-004', 'A', 'Aster Estate A', 2.50, 10.602940, 122.933900, 'available', 'Section A, Lot 4'),
('A-005', 'A', 'Aster Estate A', 2.50, 10.602970, 122.933950, 'reserved', 'Section A, Lot 5'),
('A-006', 'A', 'Aster Estate A', 2.50, 10.602800, 122.933820, 'available', 'Section A, Lot 6'),
('A-007', 'A', 'Aster Estate A', 2.50, 10.602830, 122.933870, 'available', 'Section A, Lot 7'),
('A-008', 'A', 'Aster Estate A', 2.50, 10.602760, 122.933890, 'occupied', 'Section A, Lot 8'),
('A-009', 'A', 'Aster Estate A', 2.50, 10.602790, 122.933940, 'available', 'Section A, Lot 9'),
('A-010', 'A', 'Aster Estate A', 2.50, 10.602820, 122.933990, 'reserved', 'Section A, Lot 10'),

-- Section B (10 lots)
('B-001', 'B', 'Aster Estate A', 2.50, 10.603040, 122.934050, 'available', 'Section B, Lot 1'),
('B-002', 'B', 'Aster Estate A', 2.50, 10.603070, 122.934100, 'available', 'Section B, Lot 2'),
('B-003', 'B', 'Aster Estate A', 2.50, 10.603100, 122.934150, 'occupied', 'Section B, Lot 3'),
('B-004', 'B', 'Aster Estate A', 2.50, 10.603130, 122.934200, 'available', 'Section B, Lot 4'),
('B-005', 'B', 'Aster Estate A', 2.50, 10.603160, 122.934250, 'reserved', 'Section B, Lot 5'),
('B-006', 'B', 'Aster Estate A', 2.50, 10.602970, 122.934120, 'available', 'Section B, Lot 6'),
('B-007', 'B', 'Aster Estate A', 2.50, 10.603000, 122.934170, 'available', 'Section B, Lot 7'),
('B-008', 'B', 'Aster Estate A', 2.50, 10.602940, 122.934190, 'occupied', 'Section B, Lot 8'),
('B-009', 'B', 'Aster Estate A', 2.50, 10.602960, 122.934240, 'available', 'Section B, Lot 9'),
('B-010', 'B', 'Aster Estate A', 2.50, 10.603080, 122.934280, 'reserved', 'Section B, Lot 10'),

-- Section C (10 lots)
('C-001', 'C', 'Aster Estate A', 2.50, 10.602900, 122.934200, 'available', 'Section C, Lot 1'),
('C-002', 'C', 'Aster Estate A', 2.50, 10.602930, 122.934260, 'available', 'Section C, Lot 2'),
('C-003', 'C', 'Aster Estate A', 2.50, 10.602960, 122.934320, 'occupied', 'Section C, Lot 3'),
('C-004', 'C', 'Aster Estate A', 2.50, 10.602990, 122.934380, 'available', 'Section C, Lot 4'),
('C-005', 'C', 'Aster Estate A', 2.50, 10.602860, 122.934300, 'reserved', 'Section C, Lot 5'),
('C-006', 'C', 'Aster Estate A', 2.50, 10.602820, 122.934350, 'available', 'Section C, Lot 6'),
('C-007', 'C', 'Aster Estate A', 2.50, 10.602780, 122.934400, 'available', 'Section C, Lot 7'),
('C-008', 'C', 'Aster Estate A', 2.50, 10.602750, 122.934450, 'occupied', 'Section C, Lot 8'),
('C-009', 'C', 'Aster Estate A', 2.50, 10.602870, 122.934420, 'available', 'Section C, Lot 9'),
('C-010', 'C', 'Aster Estate A', 2.50, 10.602840, 122.934480, 'reserved', 'Section C, Lot 10'),

-- Section D (10 lots)
('D-001', 'D', 'Aster Estate A', 2.50, 10.602600, 122.933920, 'available', 'Section D, Lot 1'),
('D-002', 'D', 'Aster Estate A', 2.50, 10.602630, 122.933970, 'available', 'Section D, Lot 2'),
('D-003', 'D', 'Aster Estate A', 2.50, 10.602660, 122.934020, 'occupied', 'Section D, Lot 3'),
('D-004', 'D', 'Aster Estate A', 2.50, 10.602690, 122.934070, 'available', 'Section D, Lot 4'),
('D-005', 'D', 'Aster Estate A', 2.50, 10.602550, 122.933990, 'reserved', 'Section D, Lot 5'),
('D-006', 'D', 'Aster Estate A', 2.50, 10.602520, 122.934040, 'available', 'Section D, Lot 6'),
('D-007', 'D', 'Aster Estate A', 2.50, 10.602490, 122.934090, 'available', 'Section D, Lot 7'),
('D-008', 'D', 'Aster Estate A', 2.50, 10.602460, 122.934140, 'occupied', 'Section D, Lot 8'),
('D-009', 'D', 'Aster Estate A', 2.50, 10.602580, 122.934110, 'available', 'Section D, Lot 9'),
('D-010', 'D', 'Aster Estate A', 2.50, 10.602540, 122.934160, 'reserved', 'Section D, Lot 10'),

-- Section E (10 lots)
('E-001', 'E', 'Aster Estate A', 2.50, 10.602350, 122.934120, 'available', 'Section E, Lot 1'),
('E-002', 'E', 'Aster Estate A', 2.50, 10.602380, 122.934170, 'available', 'Section E, Lot 2'),
('E-003', 'E', 'Aster Estate A', 2.50, 10.602410, 122.934220, 'occupied', 'Section E, Lot 3'),
('E-004', 'E', 'Aster Estate A', 2.50, 10.602440, 122.934270, 'available', 'Section E, Lot 4'),
('E-005', 'E', 'Aster Estate A', 2.50, 10.602300, 122.934190, 'reserved', 'Section E, Lot 5'),
('E-006', 'E', 'Aster Estate A', 2.50, 10.602270, 122.934240, 'available', 'Section E, Lot 6'),
('E-007', 'E', 'Aster Estate A', 2.50, 10.602240, 122.934290, 'available', 'Section E, Lot 7'),
('E-008', 'E', 'Aster Estate A', 2.50, 10.602210, 122.934340, 'occupied', 'Section E, Lot 8'),
('E-009', 'E', 'Aster Estate A', 2.50, 10.602470, 122.934320, 'available', 'Section E, Lot 9'),
('E-010', 'E', 'Aster Estate A', 2.50, 10.602320, 122.934380, 'reserved', 'Section E, Lot 10'),

-- Section F (10 lots)
('F-001', 'F', 'Aster Estate A', 2.50, 10.602550, 122.934380, 'available', 'Section F, Lot 1'),
('F-002', 'F', 'Aster Estate A', 2.50, 10.602580, 122.934430, 'available', 'Section F, Lot 2'),
('F-003', 'F', 'Aster Estate A', 2.50, 10.602610, 122.934480, 'occupied', 'Section F, Lot 3'),
('F-004', 'F', 'Aster Estate A', 2.50, 10.602640, 122.934530, 'available', 'Section F, Lot 4'),
('F-005', 'F', 'Aster Estate A', 2.50, 10.602500, 122.934450, 'reserved', 'Section F, Lot 5'),
('F-006', 'F', 'Aster Estate A', 2.50, 10.602470, 122.934500, 'available', 'Section F, Lot 6'),
('F-007', 'F', 'Aster Estate A', 2.50, 10.602440, 122.934550, 'available', 'Section F, Lot 7'),
('F-008', 'F', 'Aster Estate A', 2.50, 10.602410, 122.934600, 'occupied', 'Section F, Lot 8'),
('F-009', 'F', 'Aster Estate A', 2.50, 10.602670, 122.934580, 'available', 'Section F, Lot 9'),
('F-010', 'F', 'Aster Estate A', 2.50, 10.602520, 122.934650, 'reserved', 'Section F, Lot 10'),

-- Section G (10 lots)
('G-001', 'G', 'Aster Estate A', 2.50, 10.602300, 122.934580, 'available', 'Section G, Lot 1'),
('G-002', 'G', 'Aster Estate A', 2.50, 10.602330, 122.934630, 'available', 'Section G, Lot 2'),
('G-003', 'G', 'Aster Estate A', 2.50, 10.602360, 122.934680, 'occupied', 'Section G, Lot 3'),
('G-004', 'G', 'Aster Estate A', 2.50, 10.602390, 122.934730, 'available', 'Section G, Lot 4'),
('G-005', 'G', 'Aster Estate A', 2.50, 10.602250, 122.934650, 'reserved', 'Section G, Lot 5'),
('G-006', 'G', 'Aster Estate A', 2.50, 10.602220, 122.934700, 'available', 'Section G, Lot 6'),
('G-007', 'G', 'Aster Estate A', 2.50, 10.602190, 122.934750, 'available', 'Section G, Lot 7'),
('G-008', 'G', 'Aster Estate A', 2.50, 10.602160, 122.934800, 'occupied', 'Section G, Lot 8'),
('G-009', 'G', 'Aster Estate A', 2.50, 10.602420, 122.934780, 'available', 'Section G, Lot 9'),
('G-010', 'G', 'Aster Estate A', 2.50, 10.602270, 122.934850, 'reserved', 'Section G, Lot 10'),

-- Section H (10 lots)
('H-001', 'H', 'Aster Estate A', 2.50, 10.602100, 122.934320, 'available', 'Section H, Lot 1'),
('H-002', 'H', 'Aster Estate A', 2.50, 10.602120, 122.934370, 'available', 'Section H, Lot 2'),
('H-003', 'H', 'Aster Estate A', 2.50, 10.602140, 122.934420, 'occupied', 'Section H, Lot 3'),
('H-004', 'H', 'Aster Estate A', 2.50, 10.602060, 122.934450, 'available', 'Section H, Lot 4'),
('H-005', 'H', 'Aster Estate A', 2.50, 10.602030, 122.934500, 'reserved', 'Section H, Lot 5'),
('H-006', 'H', 'Aster Estate A', 2.50, 10.602000, 122.934550, 'available', 'Section H, Lot 6'),
('H-007', 'H', 'Aster Estate A', 2.50, 10.601970, 122.934470, 'available', 'Section H, Lot 7'),
('H-008', 'H', 'Aster Estate A', 2.50, 10.602080, 122.934580, 'occupied', 'Section H, Lot 8'),
('H-009', 'H', 'Aster Estate A', 2.50, 10.601950, 122.934520, 'available', 'Section H, Lot 9'),
('H-010', 'H', 'Aster Estate A', 2.50, 10.602160, 122.934470, 'reserved', 'Section H, Lot 10'),

-- === ASTER ESTATE B ===
-- Section I (10 lots)
('I-001', 'I', 'Aster Estate B', 2.50, 10.603150, 122.934550, 'available', 'Section I, Lot 1'),
('I-002', 'I', 'Aster Estate B', 2.50, 10.603180, 122.934620, 'available', 'Section I, Lot 2'),
('I-003', 'I', 'Aster Estate B', 2.50, 10.603210, 122.934690, 'occupied', 'Section I, Lot 3'),
('I-004', 'I', 'Aster Estate B', 2.50, 10.603240, 122.934760, 'available', 'Section I, Lot 4'),
('I-005', 'I', 'Aster Estate B', 2.50, 10.603100, 122.934650, 'reserved', 'Section I, Lot 5'),
('I-006', 'I', 'Aster Estate B', 2.50, 10.603070, 122.934720, 'available', 'Section I, Lot 6'),
('I-007', 'I', 'Aster Estate B', 2.50, 10.603040, 122.934790, 'available', 'Section I, Lot 7'),
('I-008', 'I', 'Aster Estate B', 2.50, 10.603010, 122.934660, 'occupied', 'Section I, Lot 8'),
('I-009', 'I', 'Aster Estate B', 2.50, 10.603270, 122.934830, 'available', 'Section I, Lot 9'),
('I-010', 'I', 'Aster Estate B', 2.50, 10.603130, 122.934880, 'reserved', 'Section I, Lot 10'),

-- Section J (10 lots)
('J-001', 'J', 'Aster Estate B', 2.50, 10.603450, 122.934850, 'available', 'Section J, Lot 1'),
('J-002', 'J', 'Aster Estate B', 2.50, 10.603480, 122.934920, 'available', 'Section J, Lot 2'),
('J-003', 'J', 'Aster Estate B', 2.50, 10.603510, 122.934990, 'occupied', 'Section J, Lot 3'),
('J-004', 'J', 'Aster Estate B', 2.50, 10.603540, 122.935060, 'available', 'Section J, Lot 4'),
('J-005', 'J', 'Aster Estate B', 2.50, 10.603570, 122.935130, 'reserved', 'Section J, Lot 5'),
('J-006', 'J', 'Aster Estate B', 2.50, 10.603400, 122.934980, 'available', 'Section J, Lot 6'),
('J-007', 'J', 'Aster Estate B', 2.50, 10.603370, 122.935050, 'available', 'Section J, Lot 7'),
('J-008', 'J', 'Aster Estate B', 2.50, 10.603340, 122.935120, 'occupied', 'Section J, Lot 8'),
('J-009', 'J', 'Aster Estate B', 2.50, 10.603600, 122.935200, 'available', 'Section J, Lot 9'),
('J-010', 'J', 'Aster Estate B', 2.50, 10.603430, 122.935180, 'reserved', 'Section J, Lot 10'),

-- Section K (10 lots)
('K-001', 'K', 'Aster Estate B', 2.50, 10.602950, 122.934700, 'available', 'Section K, Lot 1'),
('K-002', 'K', 'Aster Estate B', 2.50, 10.602980, 122.934770, 'available', 'Section K, Lot 2'),
('K-003', 'K', 'Aster Estate B', 2.50, 10.603010, 122.934840, 'occupied', 'Section K, Lot 3'),
('K-004', 'K', 'Aster Estate B', 2.50, 10.603040, 122.934910, 'available', 'Section K, Lot 4'),
('K-005', 'K', 'Aster Estate B', 2.50, 10.602900, 122.934800, 'reserved', 'Section K, Lot 5'),
('K-006', 'K', 'Aster Estate B', 2.50, 10.602870, 122.934870, 'available', 'Section K, Lot 6'),
('K-007', 'K', 'Aster Estate B', 2.50, 10.602840, 122.934940, 'available', 'Section K, Lot 7'),
('K-008', 'K', 'Aster Estate B', 2.50, 10.602810, 122.935010, 'occupied', 'Section K, Lot 8'),
('K-009', 'K', 'Aster Estate B', 2.50, 10.603070, 122.934980, 'available', 'Section K, Lot 9'),
('K-010', 'K', 'Aster Estate B', 2.50, 10.602930, 122.935050, 'reserved', 'Section K, Lot 10'),

-- Section L (10 lots)
('L-001', 'L', 'Aster Estate B', 2.50, 10.603220, 122.935050, 'available', 'Section L, Lot 1'),
('L-002', 'L', 'Aster Estate B', 2.50, 10.603250, 122.935120, 'available', 'Section L, Lot 2'),
('L-003', 'L', 'Aster Estate B', 2.50, 10.603280, 122.935190, 'occupied', 'Section L, Lot 3'),
('L-004', 'L', 'Aster Estate B', 2.50, 10.603310, 122.935260, 'available', 'Section L, Lot 4'),
('L-005', 'L', 'Aster Estate B', 2.50, 10.603170, 122.935150, 'reserved', 'Section L, Lot 5'),
('L-006', 'L', 'Aster Estate B', 2.50, 10.603140, 122.935220, 'available', 'Section L, Lot 6'),
('L-007', 'L', 'Aster Estate B', 2.50, 10.603110, 122.935290, 'available', 'Section L, Lot 7'),
('L-008', 'L', 'Aster Estate B', 2.50, 10.603080, 122.935360, 'occupied', 'Section L, Lot 8'),
('L-009', 'L', 'Aster Estate B', 2.50, 10.603340, 122.935330, 'available', 'Section L, Lot 9'),
('L-010', 'L', 'Aster Estate B', 2.50, 10.603200, 122.935400, 'reserved', 'Section L, Lot 10'),

-- Section M (10 lots)
('M-001', 'M', 'Aster Estate B', 2.50, 10.602700, 122.934880, 'available', 'Section M, Lot 1'),
('M-002', 'M', 'Aster Estate B', 2.50, 10.602730, 122.934940, 'available', 'Section M, Lot 2'),
('M-003', 'M', 'Aster Estate B', 2.50, 10.602760, 122.935000, 'occupied', 'Section M, Lot 3'),
('M-004', 'M', 'Aster Estate B', 2.50, 10.602790, 122.935060, 'available', 'Section M, Lot 4'),
('M-005', 'M', 'Aster Estate B', 2.50, 10.602650, 122.934950, 'reserved', 'Section M, Lot 5'),
('M-006', 'M', 'Aster Estate B', 2.50, 10.602620, 122.935020, 'available', 'Section M, Lot 6'),
('M-007', 'M', 'Aster Estate B', 2.50, 10.602590, 122.935080, 'available', 'Section M, Lot 7'),
('M-008', 'M', 'Aster Estate B', 2.50, 10.602560, 122.935140, 'occupied', 'Section M, Lot 8'),
('M-009', 'M', 'Aster Estate B', 2.50, 10.602820, 122.935120, 'available', 'Section M, Lot 9'),
('M-010', 'M', 'Aster Estate B', 2.50, 10.602680, 122.935180, 'reserved', 'Section M, Lot 10'),

-- Section N (10 lots)
('N-001', 'N', 'Aster Estate B', 2.50, 10.602950, 122.935200, 'available', 'Section N, Lot 1'),
('N-002', 'N', 'Aster Estate B', 2.50, 10.602980, 122.935270, 'available', 'Section N, Lot 2'),
('N-003', 'N', 'Aster Estate B', 2.50, 10.603010, 122.935340, 'occupied', 'Section N, Lot 3'),
('N-004', 'N', 'Aster Estate B', 2.50, 10.603040, 122.935410, 'available', 'Section N, Lot 4'),
('N-005', 'N', 'Aster Estate B', 2.50, 10.602900, 122.935280, 'reserved', 'Section N, Lot 5'),
('N-006', 'N', 'Aster Estate B', 2.50, 10.602870, 122.935350, 'available', 'Section N, Lot 6'),
('N-007', 'N', 'Aster Estate B', 2.50, 10.602840, 122.935420, 'available', 'Section N, Lot 7'),
('N-008', 'N', 'Aster Estate B', 2.50, 10.603070, 122.935470, 'occupied', 'Section N, Lot 8'),
('N-009', 'N', 'Aster Estate B', 2.50, 10.602930, 122.935380, 'available', 'Section N, Lot 9'),
('N-010', 'N', 'Aster Estate B', 2.50, 10.603000, 122.935450, 'reserved', 'Section N, Lot 10'),

-- === ASTER ESTATE C ===
-- Section O (10 lots)
('O-001', 'O', 'Aster Estate C', 2.50, 10.602850, 122.935550, 'available', 'Section O, Lot 1'),
('O-002', 'O', 'Aster Estate C', 2.50, 10.602880, 122.935620, 'available', 'Section O, Lot 2'),
('O-003', 'O', 'Aster Estate C', 2.50, 10.602910, 122.935690, 'occupied', 'Section O, Lot 3'),
('O-004', 'O', 'Aster Estate C', 2.50, 10.602800, 122.935600, 'available', 'Section O, Lot 4'),
('O-005', 'O', 'Aster Estate C', 2.50, 10.602770, 122.935670, 'reserved', 'Section O, Lot 5'),
('O-006', 'O', 'Aster Estate C', 2.50, 10.602740, 122.935740, 'available', 'Section O, Lot 6'),
('O-007', 'O', 'Aster Estate C', 2.50, 10.602710, 122.935510, 'available', 'Section O, Lot 7'),
('O-008', 'O', 'Aster Estate C', 2.50, 10.602680, 122.935580, 'occupied', 'Section O, Lot 8'),
('O-009', 'O', 'Aster Estate C', 2.50, 10.602940, 122.935760, 'available', 'Section O, Lot 9'),
('O-010', 'O', 'Aster Estate C', 2.50, 10.602820, 122.935800, 'reserved', 'Section O, Lot 10'),

-- Section P (10 lots)
('P-001', 'P', 'Aster Estate C', 2.50, 10.602550, 122.935250, 'available', 'Section P, Lot 1'),
('P-002', 'P', 'Aster Estate C', 2.50, 10.602520, 122.935320, 'available', 'Section P, Lot 2'),
('P-003', 'P', 'Aster Estate C', 2.50, 10.602490, 122.935390, 'occupied', 'Section P, Lot 3'),
('P-004', 'P', 'Aster Estate C', 2.50, 10.602460, 122.935460, 'available', 'Section P, Lot 4'),
('P-005', 'P', 'Aster Estate C', 2.50, 10.602430, 122.935530, 'reserved', 'Section P, Lot 5'),
('P-006', 'P', 'Aster Estate C', 2.50, 10.602400, 122.935300, 'available', 'Section P, Lot 6'),
('P-007', 'P', 'Aster Estate C', 2.50, 10.602370, 122.935370, 'available', 'Section P, Lot 7'),
('P-008', 'P', 'Aster Estate C', 2.50, 10.602340, 122.935440, 'occupied', 'Section P, Lot 8'),
('P-009', 'P', 'Aster Estate C', 2.50, 10.602580, 122.935500, 'available', 'Section P, Lot 9'),
('P-010', 'P', 'Aster Estate C', 2.50, 10.602310, 122.935200, 'reserved', 'Section P, Lot 10'),

-- Section Q (10 lots)
('Q-001', 'Q', 'Aster Estate C', 2.50, 10.602650, 122.935850, 'available', 'Section Q, Lot 1'),
('Q-002', 'Q', 'Aster Estate C', 2.50, 10.602620, 122.935920, 'available', 'Section Q, Lot 2'),
('Q-003', 'Q', 'Aster Estate C', 2.50, 10.602590, 122.935990, 'occupied', 'Section Q, Lot 3'),
('Q-004', 'Q', 'Aster Estate C', 2.50, 10.602560, 122.936060, 'available', 'Section Q, Lot 4'),
('Q-005', 'Q', 'Aster Estate C', 2.50, 10.602530, 122.936130, 'reserved', 'Section Q, Lot 5'),
('Q-006', 'Q', 'Aster Estate C', 2.50, 10.602500, 122.935880, 'available', 'Section Q, Lot 6'),
('Q-007', 'Q', 'Aster Estate C', 2.50, 10.602470, 122.935950, 'available', 'Section Q, Lot 7'),
('Q-008', 'Q', 'Aster Estate C', 2.50, 10.602440, 122.936020, 'occupied', 'Section Q, Lot 8'),
('Q-009', 'Q', 'Aster Estate C', 2.50, 10.602680, 122.936100, 'available', 'Section Q, Lot 9'),
('Q-010', 'Q', 'Aster Estate C', 2.50, 10.602410, 122.936090, 'reserved', 'Section Q, Lot 10'),

-- Section R (10 lots)
('R-001', 'R', 'Aster Estate C', 2.50, 10.602380, 122.935550, 'available', 'Section R, Lot 1'),
('R-002', 'R', 'Aster Estate C', 2.50, 10.602350, 122.935620, 'available', 'Section R, Lot 2'),
('R-003', 'R', 'Aster Estate C', 2.50, 10.602320, 122.935690, 'occupied', 'Section R, Lot 3'),
('R-004', 'R', 'Aster Estate C', 2.50, 10.602290, 122.935760, 'available', 'Section R, Lot 4'),
('R-005', 'R', 'Aster Estate C', 2.50, 10.602260, 122.935830, 'reserved', 'Section R, Lot 5'),
('R-006', 'R', 'Aster Estate C', 2.50, 10.602230, 122.935600, 'available', 'Section R, Lot 6'),
('R-007', 'R', 'Aster Estate C', 2.50, 10.602200, 122.935670, 'available', 'Section R, Lot 7'),
('R-008', 'R', 'Aster Estate C', 2.50, 10.602170, 122.935740, 'occupied', 'Section R, Lot 8'),
('R-009', 'R', 'Aster Estate C', 2.50, 10.602410, 122.935870, 'available', 'Section R, Lot 9'),
('R-010', 'R', 'Aster Estate C', 2.50, 10.602140, 122.935580, 'reserved', 'Section R, Lot 10'),

-- Section S (10 lots)
('S-001', 'S', 'Aster Estate C', 2.50, 10.602500, 122.936050, 'available', 'Section S, Lot 1'),
('S-002', 'S', 'Aster Estate C', 2.50, 10.602470, 122.936100, 'available', 'Section S, Lot 2'),
('S-003', 'S', 'Aster Estate C', 2.50, 10.602440, 122.936150, 'occupied', 'Section S, Lot 3'),
('S-004', 'S', 'Aster Estate C', 2.50, 10.602410, 122.936200, 'available', 'Section S, Lot 4'),
('S-005', 'S', 'Aster Estate C', 2.50, 10.602380, 122.936100, 'reserved', 'Section S, Lot 5'),
('S-006', 'S', 'Aster Estate C', 2.50, 10.602350, 122.936150, 'available', 'Section S, Lot 6'),
('S-007', 'S', 'Aster Estate C', 2.50, 10.602320, 122.936200, 'available', 'Section S, Lot 7'),
('S-008', 'S', 'Aster Estate C', 2.50, 10.602290, 122.936120, 'occupied', 'Section S, Lot 8'),
('S-009', 'S', 'Aster Estate C', 2.50, 10.602530, 122.936180, 'available', 'Section S, Lot 9'),
('S-010', 'S', 'Aster Estate C', 2.50, 10.602260, 122.936230, 'reserved', 'Section S, Lot 10'),

-- Section T (10 lots)
('T-001', 'T', 'Aster Estate C', 2.50, 10.602200, 122.935850, 'available', 'Section T, Lot 1'),
('T-002', 'T', 'Aster Estate C', 2.50, 10.602170, 122.935920, 'available', 'Section T, Lot 2'),
('T-003', 'T', 'Aster Estate C', 2.50, 10.602140, 122.935990, 'occupied', 'Section T, Lot 3'),
('T-004', 'T', 'Aster Estate C', 2.50, 10.602110, 122.936060, 'available', 'Section T, Lot 4'),
('T-005', 'T', 'Aster Estate C', 2.50, 10.602080, 122.936130, 'reserved', 'Section T, Lot 5'),
('T-006', 'T', 'Aster Estate C', 2.50, 10.602050, 122.935880, 'available', 'Section T, Lot 6'),
('T-007', 'T', 'Aster Estate C', 2.50, 10.602020, 122.935950, 'available', 'Section T, Lot 7'),
('T-008', 'T', 'Aster Estate C', 2.50, 10.601990, 122.936020, 'occupied', 'Section T, Lot 8'),
('T-009', 'T', 'Aster Estate C', 2.50, 10.601960, 122.936090, 'available', 'Section T, Lot 9'),
('T-010', 'T', 'Aster Estate C', 2.50, 10.601930, 122.936160, 'reserved', 'Section T, Lot 10'),

-- === ASTER ESTATE D ===
-- Section U (10 lots)
('U-001', 'U', 'Aster Estate D', 2.50, 10.601900, 122.935720, 'available', 'Section U, Lot 1'),
('U-002', 'U', 'Aster Estate D', 2.50, 10.601880, 122.935780, 'available', 'Section U, Lot 2'),
('U-003', 'U', 'Aster Estate D', 2.50, 10.601860, 122.935840, 'occupied', 'Section U, Lot 3'),
('U-004', 'U', 'Aster Estate D', 2.50, 10.601840, 122.935900, 'available', 'Section U, Lot 4'),
('U-005', 'U', 'Aster Estate D', 2.50, 10.601820, 122.935960, 'reserved', 'Section U, Lot 5'),
('U-006', 'U', 'Aster Estate D', 2.50, 10.601800, 122.936020, 'available', 'Section U, Lot 6'),
('U-007', 'U', 'Aster Estate D', 2.50, 10.601780, 122.935750, 'available', 'Section U, Lot 7'),
('U-008', 'U', 'Aster Estate D', 2.50, 10.601760, 122.935850, 'occupied', 'Section U, Lot 8'),
('U-009', 'U', 'Aster Estate D', 2.50, 10.601740, 122.935950, 'available', 'Section U, Lot 9'),
('U-010', 'U', 'Aster Estate D', 2.50, 10.601720, 122.936050, 'reserved', 'Section U, Lot 10'),

-- === ASTER ESTATE E ===
-- Section V (10 lots)
('V-001', 'V', 'Aster Estate E', 2.50, 10.601650, 122.935600, 'available', 'Section V, Lot 1'),
('V-002', 'V', 'Aster Estate E', 2.50, 10.601600, 122.935620, 'available', 'Section V, Lot 2'),
('V-003', 'V', 'Aster Estate E', 2.50, 10.601550, 122.935640, 'occupied', 'Section V, Lot 3'),
('V-004', 'V', 'Aster Estate E', 2.50, 10.601500, 122.935660, 'available', 'Section V, Lot 4'),
('V-005', 'V', 'Aster Estate E', 2.50, 10.601450, 122.935680, 'reserved', 'Section V, Lot 5'),
('V-006', 'V', 'Aster Estate E', 2.50, 10.601400, 122.935700, 'available', 'Section V, Lot 6'),
('V-007', 'V', 'Aster Estate E', 2.50, 10.601350, 122.935720, 'available', 'Section V, Lot 7'),
('V-008', 'V', 'Aster Estate E', 2.50, 10.601300, 122.935740, 'occupied', 'Section V, Lot 8'),
('V-009', 'V', 'Aster Estate E', 2.50, 10.601250, 122.935760, 'available', 'Section V, Lot 9'),
('V-010', 'V', 'Aster Estate E', 2.50, 10.601700, 122.935780, 'reserved', 'Section V, Lot 10'),

-- Section W (10 lots)
('W-001', 'W', 'Aster Estate E', 2.50, 10.601600, 122.935870, 'available', 'Section W, Lot 1'),
('W-002', 'W', 'Aster Estate E', 2.50, 10.601550, 122.935890, 'available', 'Section W, Lot 2'),
('W-003', 'W', 'Aster Estate E', 2.50, 10.601500, 122.935910, 'occupied', 'Section W, Lot 3'),
('W-004', 'W', 'Aster Estate E', 2.50, 10.601450, 122.935930, 'available', 'Section W, Lot 4'),
('W-005', 'W', 'Aster Estate E', 2.50, 10.601400, 122.935950, 'reserved', 'Section W, Lot 5'),
('W-006', 'W', 'Aster Estate E', 2.50, 10.601350, 122.935880, 'available', 'Section W, Lot 6'),
('W-007', 'W', 'Aster Estate E', 2.50, 10.601300, 122.935900, 'available', 'Section W, Lot 7'),
('W-008', 'W', 'Aster Estate E', 2.50, 10.601250, 122.935920, 'occupied', 'Section W, Lot 8'),
('W-009', 'W', 'Aster Estate E', 2.50, 10.601200, 122.935850, 'available', 'Section W, Lot 9'),
('W-010', 'W', 'Aster Estate E', 2.50, 10.601500, 122.935980, 'reserved', 'Section W, Lot 10');
