-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 19, 2020 at 04:49 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Prototype`
--

-- --------------------------------------------------------

--
-- Table structure for table `AwayTeam`
--

CREATE TABLE `AwayTeam` (
  `AwayTeamID` int(10) NOT NULL,
  `TeamName` text NOT NULL,
  `Players` int(100) NOT NULL,
  `StadiumID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AwayTeam`
--

INSERT INTO `AwayTeam` (`AwayTeamID`, `TeamName`, `Players`, `StadiumID`) VALUES
(1, 'Liverpool', 50, 1),
(2, 'Manchester City', 50, 2),
(3, 'Manchester United', 50, 3),
(4, 'Chelsea', 50, 4),
(5, 'Leicester', 50, 5),
(6, 'Tottenham Hotspur', 50, 6),
(7, 'Wolverhampton', 50, 7),
(8, 'Arsenal', 50, 8),
(9, 'Sheffield United', 50, 9),
(10, 'Burnley', 50, 10),
(11, 'Southampton', 50, 11),
(12, 'Everton', 50, 12),
(13, 'Newcastle', 50, 13),
(14, 'Crystal Palace', 50, 14),
(15, 'Brighton', 50, 15),
(16, 'West Ham', 50, 16),
(17, 'Aston Villa', 50, 17),
(18, 'Bournemouth', 50, 18),
(19, 'Watford', 50, 19),
(20, 'Norwich', 50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `FavoriteTeams`
--

CREATE TABLE `FavoriteTeams` (
  `FavoriteTeamID` int(10) NOT NULL,
  `HomeTeamID` int(11) NOT NULL,
  `UserID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `HomeTeam`
--

CREATE TABLE `HomeTeam` (
  `HomeTeamID` int(10) NOT NULL,
  `TeamName` varchar(50) NOT NULL,
  `Players` int(100) NOT NULL,
  `StadiumID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `HomeTeam`
--

INSERT INTO `HomeTeam` (`HomeTeamID`, `TeamName`, `Players`, `StadiumID`) VALUES
(1, 'Liverpool', 50, 1),
(2, 'Manchester City', 50, 2),
(3, 'Manchester United', 50, 3),
(4, 'Chelsea', 50, 4),
(5, 'Leicester', 50, 5),
(6, 'Tottenham Hotspur', 50, 6),
(7, 'Wolverhampton', 50, 7),
(8, 'Arsenal', 50, 8),
(9, 'Sheffield United', 50, 9),
(10, 'Burnley', 50, 10),
(11, 'Southampton', 50, 11),
(12, 'Everton', 50, 12),
(13, 'Newcastle', 50, 13),
(14, 'Crystal Palace', 50, 14),
(15, 'Brighton', 50, 15),
(16, 'West Ham', 50, 16),
(17, 'Aston Villa', 50, 17),
(18, 'Bournemouth', 50, 18),
(19, 'Watford', 50, 19),
(20, 'Norwich', 50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

CREATE TABLE `Log` (
  `LogID` int(10) NOT NULL,
  `IP` int(200) NOT NULL,
  `browser` varchar(200) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `action` varchar(200) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MatchInformation`
--

CREATE TABLE `MatchInformation` (
  `MatchInfoID` int(10) NOT NULL,
  `DateOfMatch` date NOT NULL,
  `HomeTeamID` int(11) NOT NULL,
  `AwayTeamID` int(11) NOT NULL,
  `Cost` varchar(50) NOT NULL,
  `StadiumID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MatchInformation`
--

INSERT INTO `MatchInformation` (`MatchInfoID`, `DateOfMatch`, `HomeTeamID`, `AwayTeamID`, `Cost`, `StadiumID`) VALUES
(1, '2020-10-01', 3, 4, '$1000', 3),
(2, '2020-10-01', 1, 8, '$900', 1),
(3, '2020-10-01', 2, 6, '$800', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ReservedSeat`
--

CREATE TABLE `ReservedSeat` (
  `ReservedSeatID` int(10) NOT NULL,
  `SeatNumber` int(10) NOT NULL,
  `PaymentMethod` varchar(50) NOT NULL,
  `TicketInfoID` int(10) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Stadium`
--

CREATE TABLE `Stadium` (
  `StadiumID` int(10) NOT NULL,
  `StadiumName` text NOT NULL,
  `HomeTeam` text NOT NULL,
  `Location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Stadium`
--

INSERT INTO `Stadium` (`StadiumID`, `StadiumName`, `HomeTeam`, `Location`) VALUES
(1, 'Anfield', 'Liverpool', ''),
(2, 'Etihad Stadium', 'Manchester City', ''),
(3, 'Old Trafford', 'Manchester United', ''),
(4, 'Stamford Bridge', 'Chelsea', ''),
(5, 'King Power Stadium', 'Leicester', ''),
(6, 'Tottenham Hotspur', 'Tottenham Hotspur', ''),
(7, 'Molineux Stadium', 'Wolverhampton', ''),
(8, 'Emirates Stadium', 'Arsenal', ''),
(9, 'Bramall Lane', 'Sheffield United', ''),
(10, 'Turf Moor', 'Burnley', ''),
(11, 'St. Mary\'s Stadium', 'Southampton', ''),
(12, 'Goodison Park', 'Everton', ''),
(13, 'St. James\'s Park', 'Newcastle', ''),
(14, 'Selhurst Park', 'Crystal Palace', ''),
(15, 'Amex Stadium', 'Brighton', ''),
(16, 'London Stadium', 'West Ham', ''),
(17, 'Villa Park', 'Aston Villa', ''),
(18, 'Vitality Stadium', 'Bournemouth', ''),
(19, 'Vicarage Road', 'Watford', ''),
(20, 'Carrow Road', 'Norwich', '');

-- --------------------------------------------------------

--
-- Table structure for table `TicketInformation`
--

CREATE TABLE `TicketInformation` (
  `TicketInfoID` int(10) NOT NULL,
  `PurchasedAmount` int(10) NOT NULL,
  `SeatNumber` int(10) NOT NULL,
  `PaymentMethod` varchar(20) NOT NULL,
  `MatchInfoID` int(10) NOT NULL,
  `UserID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UserInformation`
--

CREATE TABLE `UserInformation` (
  `UserID` int(10) NOT NULL,
  `UserName` text NOT NULL,
  `Password` varchar(20) NOT NULL,
  `FirstName` text,
  `LastName` text,
  `Email` varchar(40) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserInformation`
--

INSERT INTO `UserInformation` (`UserID`, `UserName`, `Password`, `FirstName`, `LastName`, `Email`, `Phone`, `Address`) VALUES
(1, 'Suguru', 'suguruhagiwara', 'Suguru', 'Hagiwara', 'suguru.hagiwara@gmail.com', '0432687203', ''),
(47, 'Suguru', 'suguru', 'Suguru', 'Hagiwara', 'suguru.hagiwara@gmail.com', '432687203', '55a Sedgebrook st Springhill qld');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AwayTeam`
--
ALTER TABLE `AwayTeam`
  ADD PRIMARY KEY (`AwayTeamID`),
  ADD KEY `StadiumID` (`StadiumID`);

--
-- Indexes for table `FavoriteTeams`
--
ALTER TABLE `FavoriteTeams`
  ADD PRIMARY KEY (`FavoriteTeamID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TeamID` (`HomeTeamID`);

--
-- Indexes for table `HomeTeam`
--
ALTER TABLE `HomeTeam`
  ADD PRIMARY KEY (`HomeTeamID`),
  ADD KEY `StadiumID` (`StadiumID`);

--
-- Indexes for table `Log`
--
ALTER TABLE `Log`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `MatchInformation`
--
ALTER TABLE `MatchInformation`
  ADD PRIMARY KEY (`MatchInfoID`),
  ADD KEY `StadiumID` (`StadiumID`),
  ADD KEY `HomeTeamID` (`HomeTeamID`),
  ADD KEY `matchinformation_ibfk_3` (`AwayTeamID`);

--
-- Indexes for table `ReservedSeat`
--
ALTER TABLE `ReservedSeat`
  ADD PRIMARY KEY (`ReservedSeatID`),
  ADD KEY `TicketInfoID` (`TicketInfoID`);

--
-- Indexes for table `Stadium`
--
ALTER TABLE `Stadium`
  ADD PRIMARY KEY (`StadiumID`);

--
-- Indexes for table `TicketInformation`
--
ALTER TABLE `TicketInformation`
  ADD PRIMARY KEY (`TicketInfoID`),
  ADD KEY `MatchInfoID` (`MatchInfoID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `UserInformation`
--
ALTER TABLE `UserInformation`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AwayTeam`
--
ALTER TABLE `AwayTeam`
  MODIFY `AwayTeamID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `FavoriteTeams`
--
ALTER TABLE `FavoriteTeams`
  MODIFY `FavoriteTeamID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `HomeTeam`
--
ALTER TABLE `HomeTeam`
  MODIFY `HomeTeamID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `MatchInformation`
--
ALTER TABLE `MatchInformation`
  MODIFY `MatchInfoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ReservedSeat`
--
ALTER TABLE `ReservedSeat`
  MODIFY `ReservedSeatID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Stadium`
--
ALTER TABLE `Stadium`
  MODIFY `StadiumID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `TicketInformation`
--
ALTER TABLE `TicketInformation`
  MODIFY `TicketInfoID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserInformation`
--
ALTER TABLE `UserInformation`
  MODIFY `UserID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AwayTeam`
--
ALTER TABLE `AwayTeam`
  ADD CONSTRAINT `awayteam_ibfk_1` FOREIGN KEY (`StadiumID`) REFERENCES `Stadium` (`StadiumID`);

--
-- Constraints for table `FavoriteTeams`
--
ALTER TABLE `FavoriteTeams`
  ADD CONSTRAINT `favoriteteams_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInformation` (`UserID`),
  ADD CONSTRAINT `favoriteteams_ibfk_2` FOREIGN KEY (`HomeTeamID`) REFERENCES `Team` (`HomeTeamID`);

--
-- Constraints for table `HomeTeam`
--
ALTER TABLE `HomeTeam`
  ADD CONSTRAINT `hometeam_ibfk_1` FOREIGN KEY (`StadiumID`) REFERENCES `Stadium` (`StadiumID`);

--
-- Constraints for table `Log`
--
ALTER TABLE `Log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserInformation` (`UserID`);

--
-- Constraints for table `MatchInformation`
--
ALTER TABLE `MatchInformation`
  ADD CONSTRAINT `matchinformation_ibfk_1` FOREIGN KEY (`StadiumID`) REFERENCES `Stadium` (`StadiumID`),
  ADD CONSTRAINT `matchinformation_ibfk_2` FOREIGN KEY (`HomeTeamID`) REFERENCES `HomeTeam` (`HomeTeamID`),
  ADD CONSTRAINT `matchinformation_ibfk_3` FOREIGN KEY (`AwayTeamID`) REFERENCES `AwayTeam` (`AwayTeamID`);

--
-- Constraints for table `ReservedSeat`
--
ALTER TABLE `ReservedSeat`
  ADD CONSTRAINT `reservedseat_ibfk_1` FOREIGN KEY (`TicketInfoID`) REFERENCES `TicketInformation` (`TicketInfoID`);

--
-- Constraints for table `TicketInformation`
--
ALTER TABLE `TicketInformation`
  ADD CONSTRAINT `ticketinformation_ibfk_1` FOREIGN KEY (`MatchInfoID`) REFERENCES `MatchInformation` (`MatchInfoID`),
  ADD CONSTRAINT `ticketinformation_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `UserInformation` (`UserID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
