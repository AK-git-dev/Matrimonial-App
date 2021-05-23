CREATE DATABASE  IF NOT EXISTS `matrimonialdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `matrimonialdb`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: matrimonialdb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `address` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `district` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `zipCode` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `blockedusers`
--

DROP TABLE IF EXISTS `blockedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blockedusers` (
  `blockedPersonId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`blockedPersonId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `blockedusers_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `castes`
--

DROP TABLE IF EXISTS `castes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `castes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `caste` varchar(30) NOT NULL,
  `subCaste` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `castes_caste` (`caste`),
  KEY `castes_sub_caste` (`subCaste`),
  CONSTRAINT `castes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('Gradudate','Postgraduate','Doctorate') NOT NULL,
  `degree` enum('B.Tech','M.Tech','Masters','Hons','B.Par') NOT NULL,
  `InstitutionName` varchar(30) NOT NULL,
  `specializationIn` varchar(30) NOT NULL,
  `passoutYear` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `educations_type_degree` (`type`,`degree`),
  CONSTRAINT `educations_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favouritepersons`
--

DROP TABLE IF EXISTS `favouritepersons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favouritepersons` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `favouritePersonId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `favouritepersons_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hobbies`
--

DROP TABLE IF EXISTS `hobbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hobbies` (
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `hobbies_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lifestyles`
--

DROP TABLE IF EXISTS `lifestyles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lifestyles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `height` decimal(10,0) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `bloogGroup` char(3) DEFAULT NULL,
  `dressStyle` varchar(255) DEFAULT NULL,
  `bodyShape` varchar(255) DEFAULT NULL,
  `skinComplextion` varchar(255) DEFAULT NULL,
  `diet` varchar(255) DEFAULT NULL,
  `drikingHabbits` varchar(255) DEFAULT NULL,
  `smokingHabbits` varchar(255) DEFAULT NULL,
  `sportsFitness` varchar(255) DEFAULT NULL,
  `anyChildren` enum('1','2','3+') DEFAULT NULL,
  `dateOfMarriage` date DEFAULT NULL,
  `dateDivorced` date DEFAULT NULL,
  `isDivorced` tinyint(1) DEFAULT NULL,
  `reasonForDivorced` varchar(80) DEFAULT NULL,
  `haveAnyDieases` tinyint(1) DEFAULT NULL,
  `descriptionOfDieases` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PrivacySettingId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PrivacySettingId` (`PrivacySettingId`),
  KEY `life_styles_height` (`height`),
  KEY `life_styles_diet` (`diet`),
  CONSTRAINT `lifestyles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lifestyles_ibfk_2` FOREIGN KEY (`PrivacySettingId`) REFERENCES `privacysettings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sentMessagesContent` text NOT NULL,
  `receivedMessagesContent` text NOT NULL,
  `sendTime` time NOT NULL,
  `status` enum('SEEN','DELIVERED') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `occupations`
--

DROP TABLE IF EXISTS `occupations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occupations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `currentCompanyName` varchar(15) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `isSelfEmployeed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `occupations_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `peoplewhoviewedyou`
--

DROP TABLE IF EXISTS `peoplewhoviewedyou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peoplewhoviewedyou` (
  `id` varchar(255) NOT NULL,
  `personWhoViewedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `peoplewhoviewedyou_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personwhofavouritedyou`
--

DROP TABLE IF EXISTS `personwhofavouritedyou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personwhofavouritedyou` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `personWhoFavoritedYouID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `personwhofavouritedyou_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `privacysettings`
--

DROP TABLE IF EXISTS `privacysettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privacysettings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('VISIBLE_TO_ALL','ONLY_CONNECTIONS_ACCEPTED','PRIVATE') DEFAULT 'ONLY_CONNECTIONS_ACCEPTED',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profilepictures`
--

DROP TABLE IF EXISTS `profilepictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilepictures` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `filename` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `profilepictures_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requestaccepted`
--

DROP TABLE IF EXISTS `requestaccepted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestaccepted` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `friendID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `requestaccepted_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requestsend`
--

DROP TABLE IF EXISTS `requestsend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestsend` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sendPersonId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `requestsend_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trustscores`
--

DROP TABLE IF EXISTS `trustscores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trustscores` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `matchingID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `secondUser` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matchingID` (`matchingID`),
  KEY `firstUser` (`firstUser`),
  KEY `secondUser` (`secondUser`),
  CONSTRAINT `trustscores_ibfk_1` FOREIGN KEY (`matchingID`) REFERENCES `requestaccepted` (`id`),
  CONSTRAINT `trustscores_ibfk_2` FOREIGN KEY (`firstUser`) REFERENCES `users` (`id`),
  CONSTRAINT `trustscores_ibfk_3` FOREIGN KEY (`secondUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `uploadeddocuments`
--

DROP TABLE IF EXISTS `uploadeddocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploadeddocuments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aadharCard` varchar(70) DEFAULT NULL,
  `drivingLicense` varchar(70) DEFAULT NULL,
  `passport` varchar(70) DEFAULT NULL,
  `voterCard` varchar(70) DEFAULT NULL,
  `panCard` varchar(70) DEFAULT NULL,
  `graduateCertificate` varchar(70) DEFAULT NULL,
  `higherSecondaryCertificate` varchar(70) DEFAULT NULL,
  `secondaryCertificate` varchar(70) DEFAULT NULL,
  `diplomaCertificate` varchar(70) DEFAULT NULL,
  `appointmentLetter` varchar(70) DEFAULT NULL,
  `tradeLicense` varchar(70) DEFAULT NULL,
  `taxation` varchar(70) DEFAULT NULL,
  `shopAggrement` varchar(70) DEFAULT NULL,
  `bankPassbook` varchar(70) DEFAULT NULL,
  `salarySlip` varchar(70) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `uploadeddocuments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullname` varchar(25) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `age` smallint NOT NULL,
  `gender` enum('Male','Female','Shemale') NOT NULL,
  `phoneNumber` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `martialStatus` enum('Single','Widowed','Marriaged','Divorced','Separated') NOT NULL,
  `motherTongue` varchar(255) NOT NULL,
  `isCasteBarrier` tinyint(1) NOT NULL,
  `fathersName` varchar(255) DEFAULT NULL,
  `mothersName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`),
  UNIQUE KEY `email` (`email`),
  KEY `users_age` (`age`),
  KEY `users_fullname` (`fullname`),
  KEY `users_martial_status` (`martialStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vaccationdestinations`
--

DROP TABLE IF EXISTS `vaccationdestinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccationdestinations` (
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LifeStyleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `LifeStyleId` (`LifeStyleId`),
  CONSTRAINT `vaccationdestinations_ibfk_1` FOREIGN KEY (`LifeStyleId`) REFERENCES `lifestyles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'matrimonialdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-23 12:55:11


-- Get All The User Information Associated with all data
SELECT
    `Users`.`id`,
    `Users`.`fullname`,
    `Users`.`dateOfBirth`,
    `Users`.`age`,
    `Users`.`gender`,
    `Users`.`phoneNumber`,
    `Users`.`email`,
    `Users`.`martialStatus`,
    `Users`.`motherTongue`,
    `Users`.`isCasteBarrier`,
    `Users`.`fathersName`,
    `Users`.`mothersName`,
    `Users`.`createdAt`,
    `Users`.`updatedAt`,
    `Educations`.`id` AS `Educations.id`,
    `Educations`.`type` AS `Educations.type`,
    `Educations`.`degree` AS `Educations.degree`,
    `Educations`.`InstitutionName` AS `Educations.InstitutionName`,
    `Educations`.`specializationIn` AS `Educations.specializationIn`,
    `Educations`.`passoutYear` AS `Educations.passoutYear`,
    `Educations`.`createdAt` AS `Educations.createdAt`,
    `Educations`.`updatedAt` AS `Educations.updatedAt`,
    `Educations`.`UserId` AS `Educations.UserId`,
    `Address`.`id` AS `Address.id`,
    `Address`.`address` AS `Address.address`,
    `Address`.`city` AS `Address.city`,
    `Address`.`district` AS `Address.district`,
    `Address`.`country` AS `Address.country`,
    `Address`.`zipCode` AS `Address.zipCode`,
    `Address`.`createdAt` AS `Address.createdAt`,
    `Address`.`updatedAt` AS `Address.updatedAt`,
    `Address`.`UserId` AS `Address.UserId`,
    `LifeStyle`.`id` AS `LifeStyle.id`,
    `LifeStyle`.`height` AS `LifeStyle.height`,
    `LifeStyle`.`weight` AS `LifeStyle.weight`,
    `LifeStyle`.`bloogGroup` AS `LifeStyle.bloogGroup`,
    `LifeStyle`.`dressStyle` AS `LifeStyle.dressStyle`,
    `LifeStyle`.`bodyShape` AS `LifeStyle.bodyShape`,
    `LifeStyle`.`skinComplextion` AS `LifeStyle.skinComplextion`,
    `LifeStyle`.`diet` AS `LifeStyle.diet`,
    `LifeStyle`.`drikingHabbits` AS `LifeStyle.drikingHabbits`,
    `LifeStyle`.`smokingHabbits` AS `LifeStyle.smokingHabbits`,
    `LifeStyle`.`sportsFitness` AS `LifeStyle.sportsFitness`,
    `LifeStyle`.`anyChildren` AS `LifeStyle.anyChildren`,
    `LifeStyle`.`dateOfMarriage` AS `LifeStyle.dateOfMarriage`,
    `LifeStyle`.`dateDivorced` AS `LifeStyle.dateDivorced`,
    `LifeStyle`.`isDivorced` AS `LifeStyle.isDivorced`,
    `LifeStyle`.`reasonForDivorced` AS `LifeStyle.reasonForDivorced`,
    `LifeStyle`.`haveAnyDieases` AS `LifeStyle.haveAnyDieases`,
    `LifeStyle`.`descriptionOfDieases` AS `LifeStyle.descriptionOfDieases`,
    `LifeStyle`.`createdAt` AS `LifeStyle.createdAt`,
    `LifeStyle`.`updatedAt` AS `LifeStyle.updatedAt`,
    `LifeStyle`.`UserId` AS `LifeStyle.UserId`,
    `LifeStyle`.`PrivacySettingId` AS `LifeStyle.PrivacySettingId`,
    `LifeStyle->favouriteMovies`.`name` AS `LifeStyle.favouriteMovies.name`,
    `LifeStyle->favouriteMovies`.`createdAt` AS `LifeStyle.favouriteMovies.createdAt`,
    `LifeStyle->favouriteMovies`.`updatedAt` AS `LifeStyle.favouriteMovies.updatedAt`,
    `LifeStyle->favouriteMovies`.`LifeStyleId` AS `LifeStyle.favouriteMovies.LifeStyleId`,
    `LifeStyle->honeymoonPlaces`.`name` AS `LifeStyle.honeymoonPlaces.name`,
    `LifeStyle->honeymoonPlaces`.`createdAt` AS `LifeStyle.honeymoonPlaces.createdAt`,
    `LifeStyle->honeymoonPlaces`.`updatedAt` AS `LifeStyle.honeymoonPlaces.updatedAt`,
    `LifeStyle->honeymoonPlaces`.`LifeStyleId` AS `LifeStyle.honeymoonPlaces.LifeStyleId`,
    `LifeStyle->languagesCanSpeak`.`name` AS `LifeStyle.languagesCanSpeak.name`,
    `LifeStyle->languagesCanSpeak`.`createdAt` AS `LifeStyle.languagesCanSpeak.createdAt`,
    `LifeStyle->languagesCanSpeak`.`updatedAt` AS `LifeStyle.languagesCanSpeak.updatedAt`,
    `LifeStyle->languagesCanSpeak`.`LifeStyleId` AS `LifeStyle.languagesCanSpeak.LifeStyleId`,
    `UploadedDocument`.`id` AS `UploadedDocument.id`,
    `UploadedDocument`.`aadharCard` AS `UploadedDocument.aadharCard`,
    `UploadedDocument`.`drivingLicense` AS `UploadedDocument.drivingLicense`,
    `UploadedDocument`.`passport` AS `UploadedDocument.passport`,
    `UploadedDocument`.`voterCard` AS `UploadedDocument.voterCard`,
    `UploadedDocument`.`panCard` AS `UploadedDocument.panCard`,
    `UploadedDocument`.`graduateCertificate` AS `UploadedDocument.graduateCertificate`,
    `UploadedDocument`.`higherSecondaryCertificate` AS `UploadedDocument.higherSecondaryCertificate`,
    `UploadedDocument`.`secondaryCertificate` AS `UploadedDocument.secondaryCertificate`,
    `UploadedDocument`.`diplomaCertificate` AS `UploadedDocument.diplomaCertificate`,
    `UploadedDocument`.`appointmentLetter` AS `UploadedDocument.appointmentLetter`,
    `UploadedDocument`.`tradeLicense` AS `UploadedDocument.tradeLicense`,
    `UploadedDocument`.`taxation` AS `UploadedDocument.taxation`,
    `UploadedDocument`.`shopAggrement` AS `UploadedDocument.shopAggrement`,
    `UploadedDocument`.`bankPassbook` AS `UploadedDocument.bankPassbook`,
    `UploadedDocument`.`salarySlip` AS `UploadedDocument.salarySlip`,
    `UploadedDocument`.`createdAt` AS `UploadedDocument.createdAt`,
    `UploadedDocument`.`updatedAt` AS `UploadedDocument.updatedAt`,
    `UploadedDocument`.`UserId` AS `UploadedDocument.UserId`,
    `FavouritePersons`.`id` AS `FavouritePersons.id`,
    `FavouritePersons`.`favouritePersonId` AS `FavouritePersons.favouritePersonId`,
    `FavouritePersons`.`createdAt` AS `FavouritePersons.createdAt`,
    `FavouritePersons`.`updatedAt` AS `FavouritePersons.updatedAt`,
    `FavouritePersons`.`UserId` AS `FavouritePersons.UserId`,
    `PersonWhoFavouritedYous`.`id` AS `PersonWhoFavouritedYous.id`,
    `PersonWhoFavouritedYous`.`personWhoFavoritedYouID` AS `PersonWhoFavouritedYous.personWhoFavoritedYouID`,
    `PersonWhoFavouritedYous`.`createdAt` AS `PersonWhoFavouritedYous.createdAt`,
    `PersonWhoFavouritedYous`.`updatedAt` AS `PersonWhoFavouritedYous.updatedAt`,
    `PersonWhoFavouritedYous`.`UserId` AS `PersonWhoFavouritedYous.UserId`
FROM
    `Users` AS `Users`
    LEFT OUTER JOIN `Educations` AS `Educations` ON `Users`.`id` = `Educations`.`UserId`
    LEFT OUTER JOIN `Addresses` AS `Address` ON `Users`.`id` = `Address`.`UserId`
    LEFT OUTER JOIN `LifeStyles` AS `LifeStyle` ON `Users`.`id` = `LifeStyle`.`UserId`
    LEFT OUTER JOIN `Movies` AS `LifeStyle->favouriteMovies` ON `LifeStyle`.`id` = `LifeStyle->favouriteMovies`.`LifeStyleId`
    LEFT OUTER JOIN `VaccationDestinations` AS `LifeStyle->honeymoonPlaces` ON `LifeStyle`.`id` = `LifeStyle->honeymoonPlaces`.`LifeStyleId`
    LEFT OUTER JOIN `Languages` AS `LifeStyle->languagesCanSpeak` ON `LifeStyle`.`id` = `LifeStyle->languagesCanSpeak`.`LifeStyleId`
    LEFT OUTER JOIN `UploadedDocuments` AS `UploadedDocument` ON `Users`.`id` = `UploadedDocument`.`UserId`
    LEFT OUTER JOIN `FavouritePersons` AS `FavouritePersons` ON `Users`.`id` = `FavouritePersons`.`UserId`
    LEFT OUTER JOIN `PersonWhoFavouritedYou` AS `PersonWhoFavouritedYous` ON `Users`.`id` = `PersonWhoFavouritedYous`.`UserId`;