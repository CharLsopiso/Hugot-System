-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2024 at 04:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbhugot`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblcomments`
--

CREATE TABLE `tblcomments` (
  `comment_id` int(100) NOT NULL,
  `hugot_id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `comment` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblcomments`
--

INSERT INTO `tblcomments` (`comment_id`, `hugot_id`, `user_id`, `comment`) VALUES
(6, 25, 0, 'hala ka nice do '),
(7, 26, 0, 'nice ka multi'),
(8, 1, 0, 'wow amazing'),
(9, 2, 0, 'hala mahal din kita '),
(10, 1, 0, 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `tblhugots`
--

CREATE TABLE `tblhugots` (
  `hugot_id` int(100) NOT NULL,
  `hugot` varchar(100) NOT NULL,
  `user_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblhugots`
--

INSERT INTO `tblhugots` (`hugot_id`, `hugot`, `user_id`) VALUES
(1, 'Sa love, ‘di maiiwasan na may U-Turn. Yung akala mong dire-diretso na, may babalikan pa pala. (\"Pito', 13),
(2, 'Magmahal ka ng tapat na pulitiko, yung tumutupad sa pangako. (\"Pitok\")', 13);

-- --------------------------------------------------------

--
-- Table structure for table `tblratings`
--

CREATE TABLE `tblratings` (
  `rating_id` int(100) NOT NULL,
  `hugot_id` int(100) NOT NULL,
  `rating` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblratings`
--

INSERT INTO `tblratings` (`rating_id`, `hugot_id`, `rating`) VALUES
(36, 25, 3),
(37, 26, 5),
(38, 31, 5),
(39, 1, 5),
(40, 2, 5),
(41, 1, 5),
(42, 2, 5),
(43, 1, 1),
(44, 1, 1),
(45, 1, 1),
(46, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `id` int(100) NOT NULL,
  `user_fullname` varchar(100) NOT NULL,
  `user_username` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`id`, `user_fullname`, `user_username`, `user_password`) VALUES
(10, 'CHARLS OPISO', 'Vargas02', '234'),
(11, 'ALEX', 'ALEX01', '1234'),
(12, 'HANNAH', 'hannah', '123'),
(13, 'Pitok Batolata', 'Pitok', '123'),
(14, 'Kulas Dimalas', 'Kulas', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblcomments`
--
ALTER TABLE `tblcomments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `hugot_id` (`hugot_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tblhugots`
--
ALTER TABLE `tblhugots`
  ADD PRIMARY KEY (`hugot_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tblratings`
--
ALTER TABLE `tblratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `hugot_id` (`hugot_id`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblcomments`
--
ALTER TABLE `tblcomments`
  MODIFY `comment_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblhugots`
--
ALTER TABLE `tblhugots`
  MODIFY `hugot_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblratings`
--
ALTER TABLE `tblratings`
  MODIFY `rating_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblcomments`
--
ALTER TABLE `tblcomments`
  ADD CONSTRAINT `tblcomments_ibfk_1` FOREIGN KEY (`hugot_id`) REFERENCES `tblhugots` (`hugot_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
