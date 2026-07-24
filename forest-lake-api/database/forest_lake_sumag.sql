-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2026 at 05:52 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forest_lake_sumag`
--

-- --------------------------------------------------------

--
-- Table structure for table `burial_lots`
--

CREATE TABLE `burial_lots` (
  `id` int(11) NOT NULL,
  `lot_number` varchar(50) NOT NULL,
  `section` varchar(100) NOT NULL,
  `block` varchar(50) NOT NULL,
  `square_meter` decimal(10,2) DEFAULT NULL,
  `lot_type` enum('lawn','mini_mausoleum','estate','legacy') DEFAULT 'lawn',
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `status` enum('available','reserved','occupied') NOT NULL DEFAULT 'available',
  `description` text DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  `image_type` enum('photo','360') DEFAULT 'photo',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `burial_lots`
--

INSERT INTO `burial_lots` (`id`, `lot_number`, `section`, `block`, `square_meter`, `lot_type`, `latitude`, `longitude`, `status`, `description`, `image`, `image_type`, `created_at`, `updated_at`) VALUES
(1, 'A-001', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602855', '122.933750', 'available', 'Section A, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-24 23:38:58'),
(2, 'A-002', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602880', '122.933800', 'available', 'Section A, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(3, 'A-003', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602910', '122.933850', 'occupied', 'Section A, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(4, 'A-004', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602940', '122.933900', 'available', 'Section A, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(5, 'A-005', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602970', '122.933950', 'reserved', 'Section A, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(6, 'A-006', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602800', '122.933820', 'available', 'Section A, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(7, 'A-007', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602830', '122.933870', 'available', 'Section A, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(8, 'A-008', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602760', '122.933890', 'occupied', 'Section A, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(9, 'A-009', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602790', '122.933940', 'available', 'Section A, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(10, 'A-010', 'A', 'Aster Estate A', '2.50', 'lawn', '10.602820', '122.933990', 'reserved', 'Section A, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(11, 'B-001', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603040', '122.934050', 'available', 'Section B, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(12, 'B-002', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603070', '122.934100', 'available', 'Section B, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(13, 'B-003', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603100', '122.934150', 'occupied', 'Section B, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(14, 'B-004', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603130', '122.934200', 'available', 'Section B, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(15, 'B-005', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603160', '122.934250', 'reserved', 'Section B, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(16, 'B-006', 'B', 'Aster Estate A', '2.50', 'lawn', '10.602970', '122.934120', 'available', 'Section B, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(17, 'B-007', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603000', '122.934170', 'available', 'Section B, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(18, 'B-008', 'B', 'Aster Estate A', '2.50', 'lawn', '10.602940', '122.934190', 'occupied', 'Section B, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(19, 'B-009', 'B', 'Aster Estate A', '2.50', 'lawn', '10.602960', '122.934240', 'available', 'Section B, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(20, 'B-010', 'B', 'Aster Estate A', '2.50', 'lawn', '10.603080', '122.934280', 'reserved', 'Section B, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(21, 'C-001', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602900', '122.934200', 'available', 'Section C, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(22, 'C-002', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602930', '122.934260', 'available', 'Section C, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(23, 'C-003', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602960', '122.934320', 'occupied', 'Section C, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(24, 'C-004', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602990', '122.934380', 'available', 'Section C, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(25, 'C-005', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602860', '122.934300', 'reserved', 'Section C, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(26, 'C-006', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602820', '122.934350', 'available', 'Section C, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(27, 'C-007', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602780', '122.934400', 'available', 'Section C, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(28, 'C-008', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602750', '122.934450', 'occupied', 'Section C, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(29, 'C-009', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602870', '122.934420', 'available', 'Section C, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(30, 'C-010', 'C', 'Aster Estate A', '2.50', 'lawn', '10.602840', '122.934480', 'reserved', 'Section C, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(31, 'D-001', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602600', '122.933920', 'available', 'Section D, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(32, 'D-002', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602630', '122.933970', 'available', 'Section D, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(33, 'D-003', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602660', '122.934020', 'occupied', 'Section D, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(34, 'D-004', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602690', '122.934070', 'available', 'Section D, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(35, 'D-005', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602550', '122.933990', 'reserved', 'Section D, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(36, 'D-006', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602520', '122.934040', 'available', 'Section D, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(37, 'D-007', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602490', '122.934090', 'available', 'Section D, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(38, 'D-008', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602460', '122.934140', 'occupied', 'Section D, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(39, 'D-009', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602580', '122.934110', 'available', 'Section D, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(40, 'D-010', 'D', 'Aster Estate A', '2.50', 'lawn', '10.602540', '122.934160', 'reserved', 'Section D, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(41, 'E-001', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602350', '122.934120', 'available', 'Section E, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(42, 'E-002', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602380', '122.934170', 'available', 'Section E, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(43, 'E-003', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602410', '122.934220', 'occupied', 'Section E, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(44, 'E-004', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602440', '122.934270', 'available', 'Section E, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(45, 'E-005', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602300', '122.934190', 'reserved', 'Section E, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(46, 'E-006', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602270', '122.934240', 'available', 'Section E, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(47, 'E-007', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602240', '122.934290', 'available', 'Section E, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(48, 'E-008', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602210', '122.934340', 'occupied', 'Section E, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(49, 'E-009', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602470', '122.934320', 'available', 'Section E, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(50, 'E-010', 'E', 'Aster Estate A', '2.50', 'lawn', '10.602320', '122.934380', 'reserved', 'Section E, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(51, 'F-001', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602550', '122.934380', 'available', 'Section F, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(52, 'F-002', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602580', '122.934430', 'available', 'Section F, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(53, 'F-003', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602610', '122.934480', 'occupied', 'Section F, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(54, 'F-004', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602640', '122.934530', 'available', 'Section F, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(55, 'F-005', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602500', '122.934450', 'reserved', 'Section F, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(56, 'F-006', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602470', '122.934500', 'available', 'Section F, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(57, 'F-007', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602440', '122.934550', 'available', 'Section F, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(58, 'F-008', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602410', '122.934600', 'occupied', 'Section F, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(59, 'F-009', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602670', '122.934580', 'available', 'Section F, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(60, 'F-010', 'F', 'Aster Estate A', '2.50', 'lawn', '10.602520', '122.934650', 'reserved', 'Section F, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(61, 'G-001', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602300', '122.934580', 'available', 'Section G, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(62, 'G-002', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602330', '122.934630', 'available', 'Section G, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(63, 'G-003', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602360', '122.934680', 'occupied', 'Section G, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(64, 'G-004', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602390', '122.934730', 'available', 'Section G, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(65, 'G-005', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602250', '122.934650', 'reserved', 'Section G, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(66, 'G-006', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602220', '122.934700', 'available', 'Section G, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(67, 'G-007', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602190', '122.934750', 'available', 'Section G, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(68, 'G-008', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602160', '122.934800', 'occupied', 'Section G, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(69, 'G-009', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602420', '122.934780', 'available', 'Section G, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(70, 'G-010', 'G', 'Aster Estate A', '2.50', 'lawn', '10.602270', '122.934850', 'reserved', 'Section G, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(71, 'H-001', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602100', '122.934320', 'available', 'Section H, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(72, 'H-002', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602120', '122.934370', 'available', 'Section H, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(73, 'H-003', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602140', '122.934420', 'occupied', 'Section H, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(74, 'H-004', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602060', '122.934450', 'available', 'Section H, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(75, 'H-005', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602030', '122.934500', 'reserved', 'Section H, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(76, 'H-006', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602000', '122.934550', 'available', 'Section H, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(77, 'H-007', 'H', 'Aster Estate A', '2.50', 'lawn', '10.601970', '122.934470', 'available', 'Section H, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(78, 'H-008', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602080', '122.934580', 'occupied', 'Section H, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(79, 'H-009', 'H', 'Aster Estate A', '2.50', 'lawn', '10.601950', '122.934520', 'available', 'Section H, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(80, 'H-010', 'H', 'Aster Estate A', '2.50', 'lawn', '10.602160', '122.934470', 'reserved', 'Section H, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(81, 'I-001', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603150', '122.934550', 'available', 'Section I, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(82, 'I-002', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603180', '122.934620', 'available', 'Section I, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(83, 'I-003', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603210', '122.934690', 'occupied', 'Section I, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(84, 'I-004', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603240', '122.934760', 'available', 'Section I, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(85, 'I-005', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603100', '122.934650', 'reserved', 'Section I, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(86, 'I-006', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603070', '122.934720', 'available', 'Section I, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(87, 'I-007', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603040', '122.934790', 'available', 'Section I, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(88, 'I-008', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603010', '122.934660', 'occupied', 'Section I, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(89, 'I-009', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603270', '122.934830', 'available', 'Section I, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(90, 'I-010', 'I', 'Aster Estate B', '2.50', 'lawn', '10.603130', '122.934880', 'reserved', 'Section I, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(91, 'J-001', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603450', '122.934850', 'available', 'Section J, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(92, 'J-002', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603480', '122.934920', 'available', 'Section J, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(93, 'J-003', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603510', '122.934990', 'occupied', 'Section J, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(94, 'J-004', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603540', '122.935060', 'available', 'Section J, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(95, 'J-005', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603570', '122.935130', 'reserved', 'Section J, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(96, 'J-006', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603400', '122.934980', 'available', 'Section J, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(97, 'J-007', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603370', '122.935050', 'available', 'Section J, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(98, 'J-008', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603340', '122.935120', 'occupied', 'Section J, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(99, 'J-009', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603600', '122.935200', 'available', 'Section J, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(100, 'J-010', 'J', 'Aster Estate B', '2.50', 'lawn', '10.603430', '122.935180', 'reserved', 'Section J, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(101, 'K-001', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602950', '122.934700', 'available', 'Section K, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(102, 'K-002', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602980', '122.934770', 'available', 'Section K, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(103, 'K-003', 'K', 'Aster Estate B', '2.50', 'lawn', '10.603010', '122.934840', 'occupied', 'Section K, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(104, 'K-004', 'K', 'Aster Estate B', '2.50', 'lawn', '10.603040', '122.934910', 'available', 'Section K, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(105, 'K-005', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602900', '122.934800', 'reserved', 'Section K, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(106, 'K-006', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602870', '122.934870', 'available', 'Section K, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(107, 'K-007', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602840', '122.934940', 'available', 'Section K, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(108, 'K-008', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602810', '122.935010', 'occupied', 'Section K, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(109, 'K-009', 'K', 'Aster Estate B', '2.50', 'lawn', '10.603070', '122.934980', 'available', 'Section K, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(110, 'K-010', 'K', 'Aster Estate B', '2.50', 'lawn', '10.602930', '122.935050', 'reserved', 'Section K, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(111, 'L-001', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603220', '122.935050', 'available', 'Section L, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(112, 'L-002', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603250', '122.935120', 'available', 'Section L, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(113, 'L-003', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603280', '122.935190', 'occupied', 'Section L, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(114, 'L-004', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603310', '122.935260', 'available', 'Section L, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(115, 'L-005', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603170', '122.935150', 'reserved', 'Section L, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(116, 'L-006', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603140', '122.935220', 'available', 'Section L, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(117, 'L-007', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603110', '122.935290', 'available', 'Section L, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(118, 'L-008', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603080', '122.935360', 'occupied', 'Section L, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(119, 'L-009', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603340', '122.935330', 'available', 'Section L, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(120, 'L-010', 'L', 'Aster Estate B', '2.50', 'lawn', '10.603200', '122.935400', 'reserved', 'Section L, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(121, 'M-001', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602700', '122.934880', 'available', 'Section M, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(122, 'M-002', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602730', '122.934940', 'available', 'Section M, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(123, 'M-003', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602760', '122.935000', 'occupied', 'Section M, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(124, 'M-004', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602790', '122.935060', 'available', 'Section M, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(125, 'M-005', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602650', '122.934950', 'reserved', 'Section M, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(126, 'M-006', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602620', '122.935020', 'available', 'Section M, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(127, 'M-007', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602590', '122.935080', 'available', 'Section M, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(128, 'M-008', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602560', '122.935140', 'occupied', 'Section M, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(129, 'M-009', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602820', '122.935120', 'available', 'Section M, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(130, 'M-010', 'M', 'Aster Estate B', '2.50', 'lawn', '10.602680', '122.935180', 'reserved', 'Section M, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(131, 'N-001', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602950', '122.935200', 'available', 'Section N, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(132, 'N-002', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602980', '122.935270', 'available', 'Section N, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(133, 'N-003', 'N', 'Aster Estate B', '2.50', 'lawn', '10.603010', '122.935340', 'occupied', 'Section N, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(134, 'N-004', 'N', 'Aster Estate B', '2.50', 'lawn', '10.603040', '122.935410', 'available', 'Section N, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(135, 'N-005', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602900', '122.935280', 'reserved', 'Section N, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(136, 'N-006', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602870', '122.935350', 'available', 'Section N, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(137, 'N-007', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602840', '122.935420', 'available', 'Section N, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(138, 'N-008', 'N', 'Aster Estate B', '2.50', 'lawn', '10.603070', '122.935470', 'occupied', 'Section N, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(139, 'N-009', 'N', 'Aster Estate B', '2.50', 'lawn', '10.602930', '122.935380', 'available', 'Section N, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(140, 'N-010', 'N', 'Aster Estate B', '2.50', 'lawn', '10.603000', '122.935450', 'reserved', 'Section N, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(141, 'O-001', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602850', '122.935550', 'available', 'Section O, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(142, 'O-002', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602880', '122.935620', 'available', 'Section O, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(143, 'O-003', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602910', '122.935690', 'occupied', 'Section O, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(144, 'O-004', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602800', '122.935600', 'available', 'Section O, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(145, 'O-005', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602770', '122.935670', 'reserved', 'Section O, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(146, 'O-006', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602740', '122.935740', 'available', 'Section O, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(147, 'O-007', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602710', '122.935510', 'available', 'Section O, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(148, 'O-008', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602680', '122.935580', 'occupied', 'Section O, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(149, 'O-009', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602940', '122.935760', 'available', 'Section O, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(150, 'O-010', 'O', 'Aster Estate C', '2.50', 'lawn', '10.602820', '122.935800', 'reserved', 'Section O, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(151, 'P-001', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602550', '122.935250', 'available', 'Section P, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(152, 'P-002', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602520', '122.935320', 'available', 'Section P, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(153, 'P-003', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602490', '122.935390', 'occupied', 'Section P, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(154, 'P-004', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602460', '122.935460', 'available', 'Section P, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(155, 'P-005', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602430', '122.935530', 'reserved', 'Section P, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(156, 'P-006', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602400', '122.935300', 'available', 'Section P, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(157, 'P-007', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602370', '122.935370', 'available', 'Section P, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(158, 'P-008', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602340', '122.935440', 'occupied', 'Section P, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(159, 'P-009', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602580', '122.935500', 'available', 'Section P, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(160, 'P-010', 'P', 'Aster Estate C', '2.50', 'lawn', '10.602310', '122.935200', 'reserved', 'Section P, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(161, 'Q-001', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602650', '122.935850', 'available', 'Section Q, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(162, 'Q-002', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602620', '122.935920', 'available', 'Section Q, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(163, 'Q-003', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602590', '122.935990', 'occupied', 'Section Q, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(164, 'Q-004', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602560', '122.936060', 'available', 'Section Q, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(165, 'Q-005', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602530', '122.936130', 'reserved', 'Section Q, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(166, 'Q-006', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602500', '122.935880', 'available', 'Section Q, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(167, 'Q-007', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602470', '122.935950', 'available', 'Section Q, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(168, 'Q-008', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602440', '122.936020', 'occupied', 'Section Q, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(169, 'Q-009', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602680', '122.936100', 'available', 'Section Q, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(170, 'Q-010', 'Q', 'Aster Estate C', '2.50', 'lawn', '10.602410', '122.936090', 'reserved', 'Section Q, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(171, 'R-001', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602380', '122.935550', 'available', 'Section R, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(172, 'R-002', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602350', '122.935620', 'available', 'Section R, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(173, 'R-003', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602320', '122.935690', 'occupied', 'Section R, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(174, 'R-004', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602290', '122.935760', 'available', 'Section R, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(175, 'R-005', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602260', '122.935830', 'reserved', 'Section R, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(176, 'R-006', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602230', '122.935600', 'available', 'Section R, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(177, 'R-007', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602200', '122.935670', 'available', 'Section R, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(178, 'R-008', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602170', '122.935740', 'occupied', 'Section R, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(179, 'R-009', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602410', '122.935870', 'available', 'Section R, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(180, 'R-010', 'R', 'Aster Estate C', '2.50', 'lawn', '10.602140', '122.935580', 'reserved', 'Section R, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(181, 'S-001', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602500', '122.936050', 'available', 'Section S, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(182, 'S-002', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602470', '122.936100', 'available', 'Section S, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(183, 'S-003', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602440', '122.936150', 'occupied', 'Section S, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(184, 'S-004', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602410', '122.936200', 'available', 'Section S, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(185, 'S-005', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602380', '122.936100', 'reserved', 'Section S, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(186, 'S-006', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602350', '122.936150', 'available', 'Section S, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(187, 'S-007', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602320', '122.936200', 'available', 'Section S, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(188, 'S-008', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602290', '122.936120', 'occupied', 'Section S, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(189, 'S-009', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602530', '122.936180', 'available', 'Section S, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(190, 'S-010', 'S', 'Aster Estate C', '2.50', 'lawn', '10.602260', '122.936230', 'reserved', 'Section S, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(191, 'T-001', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602200', '122.935850', 'available', 'Section T, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(192, 'T-002', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602170', '122.935920', 'available', 'Section T, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(193, 'T-003', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602140', '122.935990', 'occupied', 'Section T, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(194, 'T-004', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602110', '122.936060', 'available', 'Section T, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(195, 'T-005', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602080', '122.936130', 'reserved', 'Section T, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(196, 'T-006', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602050', '122.935880', 'available', 'Section T, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(197, 'T-007', 'T', 'Aster Estate C', '2.50', 'lawn', '10.602020', '122.935950', 'available', 'Section T, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(198, 'T-008', 'T', 'Aster Estate C', '2.50', 'lawn', '10.601990', '122.936020', 'occupied', 'Section T, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(199, 'T-009', 'T', 'Aster Estate C', '2.50', 'lawn', '10.601960', '122.936090', 'available', 'Section T, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(200, 'T-010', 'T', 'Aster Estate C', '2.50', 'lawn', '10.601930', '122.936160', 'reserved', 'Section T, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(201, 'U-001', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601900', '122.935720', 'available', 'Section U, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(202, 'U-002', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601880', '122.935780', 'available', 'Section U, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(203, 'U-003', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601860', '122.935840', 'occupied', 'Section U, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(204, 'U-004', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601840', '122.935900', 'available', 'Section U, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(205, 'U-005', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601820', '122.935960', 'reserved', 'Section U, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(206, 'U-006', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601800', '122.936020', 'available', 'Section U, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(207, 'U-007', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601780', '122.935750', 'available', 'Section U, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(208, 'U-008', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601760', '122.935850', 'occupied', 'Section U, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(209, 'U-009', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601740', '122.935950', 'available', 'Section U, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(210, 'U-010', 'U', 'Aster Estate D', '2.50', 'lawn', '10.601720', '122.936050', 'reserved', 'Section U, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(211, 'V-001', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601650', '122.935600', 'available', 'Section V, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(212, 'V-002', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601600', '122.935620', 'available', 'Section V, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(213, 'V-003', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601550', '122.935640', 'occupied', 'Section V, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(214, 'V-004', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601500', '122.935660', 'available', 'Section V, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(215, 'V-005', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601450', '122.935680', 'reserved', 'Section V, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(216, 'V-006', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601400', '122.935700', 'available', 'Section V, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(217, 'V-007', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601350', '122.935720', 'available', 'Section V, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(218, 'V-008', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601300', '122.935740', 'occupied', 'Section V, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(219, 'V-009', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601250', '122.935760', 'available', 'Section V, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(220, 'V-010', 'V', 'Aster Estate E', '2.50', 'lawn', '10.601700', '122.935780', 'reserved', 'Section V, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(221, 'W-001', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601600', '122.935870', 'available', 'Section W, Lot 1', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(222, 'W-002', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601550', '122.935890', 'available', 'Section W, Lot 2', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(223, 'W-003', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601500', '122.935910', 'occupied', 'Section W, Lot 3', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(224, 'W-004', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601450', '122.935930', 'available', 'Section W, Lot 4', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(225, 'W-005', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601400', '122.935950', 'reserved', 'Section W, Lot 5', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(226, 'W-006', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601350', '122.935880', 'available', 'Section W, Lot 6', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(227, 'W-007', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601300', '122.935900', 'available', 'Section W, Lot 7', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(228, 'W-008', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601250', '122.935920', 'occupied', 'Section W, Lot 8', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(229, 'W-009', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601200', '122.935850', 'available', 'Section W, Lot 9', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16'),
(230, 'W-010', 'W', 'Aster Estate E', '2.50', 'lawn', '10.601500', '122.935980', 'reserved', 'Section W, Lot 10', NULL, 'photo', '2026-07-23 02:09:16', '2026-07-23 02:09:16');

-- --------------------------------------------------------

--
-- Table structure for table `client_profiles`
--

CREATE TABLE `client_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT '',
  `last_name` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_profiles`
--

INSERT INTO `client_profiles` (`id`, `user_id`, `first_name`, `middle_name`, `last_name`, `contact_number`, `address`, `profile_image`, `created_at`, `updated_at`) VALUES
(1, 2, 'Client', 'Claud', 'Magan', '09919088520', 'Hacienda Salvacion', NULL, '2026-07-21 17:08:51', '2026-07-22 13:54:48'),
(2, 3, 'Edrian', 'Magan', 'Claud', '09919088520', 'Hacienda Salvacion', NULL, '2026-07-24 21:57:29', '2026-07-24 21:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_verifications`
--

INSERT INTO `email_verifications` (`id`, `user_id`, `token`, `expires_at`, `verified_at`, `created_at`) VALUES
(1, 2, '27e56cb5465af15692049d4712f47cfca43e00ecb77264e11639e4d99b25aa4b', '2026-07-22 11:08:51', NULL, '2026-07-21 17:08:51'),
(2, 3, '42dc8d24d6daff2614f602b8469082e2a532952c09f20b9ca6e7240fd0421428', '2026-07-25 15:57:29', NULL, '2026-07-24 21:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `lot_images`
--

CREATE TABLE `lot_images` (
  `id` int(11) NOT NULL,
  `burial_lot_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `image_type` enum('photo','360') DEFAULT 'photo',
  `caption` varchar(255) DEFAULT '',
  `sort_order` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `burial_lot_id` int(11) NOT NULL,
  `reservation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','declined','cancelled') NOT NULL DEFAULT 'pending',
  `admin_remarks` text DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `system_logs`
--

CREATE TABLE `system_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `description` text DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_logs`
--

INSERT INTO `system_logs` (`id`, `user_id`, `action`, `description`, `created_at`) VALUES
(1, 2, 'register', 'Client registered', '2026-07-21 17:08:51'),
(2, 2, 'login', 'User logged in', '2026-07-21 17:09:41'),
(3, 1, 'login', 'User logged in', '2026-07-21 17:14:54'),
(4, 2, 'login', 'User logged in', '2026-07-21 17:54:19'),
(5, 2, 'login', 'User logged in', '2026-07-22 13:53:20'),
(6, 2, 'login', 'User logged in', '2026-07-22 13:54:14'),
(7, 2, 'login', 'User logged in', '2026-07-22 13:55:07'),
(8, 2, 'login', 'User logged in', '2026-07-22 23:04:05'),
(9, 1, 'login', 'User logged in', '2026-07-22 23:04:36'),
(10, 1, 'login', 'User logged in', '2026-07-23 00:16:43'),
(11, 1, 'login', 'User logged in', '2026-07-23 15:53:49'),
(12, 1, 'login', 'User logged in', '2026-07-23 21:55:48'),
(13, 1, 'login', 'User logged in', '2026-07-24 11:16:52'),
(14, 1, 'login', 'User logged in', '2026-07-24 11:23:36'),
(15, 3, 'register', 'Client registered', '2026-07-24 21:57:29'),
(16, 1, 'login', 'User logged in', '2026-07-24 22:03:08'),
(17, 1, 'login', 'User logged in', '2026-07-24 22:16:09'),
(18, 1, 'login', 'User logged in', '2026-07-24 22:20:53'),
(19, 1, 'login', 'User logged in', '2026-07-24 22:33:35'),
(20, 2, 'login', 'User logged in', '2026-07-24 22:42:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','client') NOT NULL DEFAULT 'client',
  `status` enum('active','inactive','unverified') NOT NULL DEFAULT 'unverified',
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `status`, `email_verified`, `created_at`, `updated_at`) VALUES
(1, 'admin@admin.com', '$2y$10$bCzMbqA84lth8RITSe6Cxu2PPRKKjaEvpWWyr9yujaXAMZ0eKahtC', 'admin', 'active', 1, '2026-07-21 16:37:51', '2026-07-21 17:14:46'),
(2, 'client@forestlake.com', '$2y$10$bCzMbqA84lth8RITSe6Cxu2PPRKKjaEvpWWyr9yujaXAMZ0eKahtC', 'client', 'active', 1, '2026-07-21 17:08:51', '2026-07-22 13:53:45'),
(3, 'edrianmagan01@gmail.com', '$2y$10$M9VyN7QbKSKgtMAoQqWWNuJarHqeBIAqt7/jCEQAoDhNTv6vm2xZ2', 'client', 'unverified', 0, '2026-07-24 21:57:29', '2026-07-24 21:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tokens`
--

INSERT INTO `user_tokens` (`id`, `user_id`, `token`, `expires_at`, `created_at`) VALUES
(1, 2, '87eff3cf5dea906a19ed02f0ef93da531cd625c24d382f5e4d332477df6993b6', '2026-07-28 11:09:41', '2026-07-21 17:09:41'),
(2, 1, '0fbd5de6b8ebd4c18c8cf5d9a886a9267f28e13221ddc6e6121da1c4b5b6c5f8', '2026-07-28 11:14:54', '2026-07-21 17:14:54'),
(3, 2, '73c837c9bacd27dd35b7fd832e3b9591acfb8bbb921ceb3f74650147f4d7dc20', '2026-07-28 11:54:19', '2026-07-21 17:54:19'),
(4, 2, 'e9f59138fa26d5cb894f913ea8aa055504353b6c34208ef6db0655da9dcbccc1', '2026-07-29 07:53:20', '2026-07-22 13:53:20'),
(5, 2, '3b2c4af5893fa06225794d2f260d6525e4f4393016880373bc668a61cda50b66', '2026-07-29 07:54:14', '2026-07-22 13:54:14'),
(6, 2, '9bb3f0c2789e3a4451b77ab5f668fbfb046b6d18b72487bdae1a2604a84d1e98', '2026-07-29 07:55:07', '2026-07-22 13:55:07'),
(7, 2, '7e2321ce367dd267606ddb0fdbf0d5b295aeabd45141eefd82599be3e980f073', '2026-07-29 17:04:05', '2026-07-22 23:04:05'),
(8, 1, 'f31107999ea02d94cb844cce92a942bdf0d61df9d7bd0de082d1e0898671a862', '2026-07-29 17:04:36', '2026-07-22 23:04:36'),
(9, 1, 'bdf51e323a07ee990e8bca8530fcc30bd2e121427d9819a909fc3e22d8cc060c', '2026-07-29 18:16:43', '2026-07-23 00:16:43'),
(10, 1, '647833e54b453f86138699a66229df1438ef7e814e577398002904ef53747aaa', '2026-07-30 09:53:49', '2026-07-23 15:53:49'),
(11, 1, '761e39a259802cfe7ae680608a695b35d497a07b97cd392c4d9fffce25de55e9', '2026-07-30 15:55:48', '2026-07-23 21:55:48'),
(12, 1, 'ec8e7fbc18b3f2621f632df1ebdb656b74100c5fd729b938965c917060ff8eb3', '2026-07-31 05:16:52', '2026-07-24 11:16:52'),
(13, 1, 'b1b9a36f65bbc42b4abbdc40cdb922994300b6d2612470df71e26b5931cdf7d1', '2026-07-31 05:23:36', '2026-07-24 11:23:36'),
(14, 1, '4e856f2189485726de0e4c62ec327b137112d9c8368041212b7fe0235cb64c64', '2026-07-31 16:03:08', '2026-07-24 22:03:08'),
(15, 1, '47af39fccfce5fe8bad60791970cb3c9f4a6ee4d24b2acec5e90fd21107c6c2c', '2026-07-31 16:16:09', '2026-07-24 22:16:09'),
(16, 1, '48dead189a1880e07bd6a36c361ae8ea904f5a85ceb986716968b271a52e9de6', '2026-07-31 16:20:53', '2026-07-24 22:20:53'),
(17, 1, '7b7c6c72052f3ee6a80171d2b40332366eba3a2636a81618256678526f7e27dc', '2026-07-31 16:33:35', '2026-07-24 22:33:35'),
(18, 2, '93ef7c8aa91eac1fa674246cd2468202853754c2bcc7fc242feb347542ea4006', '2026-07-31 16:42:20', '2026-07-24 22:42:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `burial_lots`
--
ALTER TABLE `burial_lots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lot_number` (`lot_number`);

--
-- Indexes for table `client_profiles`
--
ALTER TABLE `client_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `lot_images`
--
ALTER TABLE `lot_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `burial_lot_id` (`burial_lot_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `burial_lot_id` (`burial_lot_id`);

--
-- Indexes for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `burial_lots`
--
ALTER TABLE `burial_lots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `client_profiles`
--
ALTER TABLE `client_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lot_images`
--
ALTER TABLE `lot_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_profiles`
--
ALTER TABLE `client_profiles`
  ADD CONSTRAINT `client_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD CONSTRAINT `email_verifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lot_images`
--
ALTER TABLE `lot_images`
  ADD CONSTRAINT `lot_images_ibfk_1` FOREIGN KEY (`burial_lot_id`) REFERENCES `burial_lots` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`burial_lot_id`) REFERENCES `burial_lots` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD CONSTRAINT `system_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
