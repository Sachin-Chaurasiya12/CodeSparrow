-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: codesparrow
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_id` int NOT NULL,
  `content` longtext,
  `secureurl` varchar(255) DEFAULT NULL,
  `publicid` varchar(255) DEFAULT NULL,
  `secureurl2` varchar(255) DEFAULT NULL,
  `publicid2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title_id` (`title_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `placement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_menu_parent` (`parent_id`),
  CONSTRAINT `fk_menu_parent` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Home',NULL,'/dashboard','bi-house',1,1,'2026-07-26 05:26:27','2026-08-16 07:29:16','topbar'),(2,'Inventory',NULL,'/Inventory','bi-box-seam',2,1,'2026-07-26 06:56:20','2026-07-28 11:49:20','topbar'),(3,'DSA Arena',NULL,'/arena','bi-code-slash',3,1,'2026-07-26 06:56:20','2026-07-26 06:56:20','topbar'),(4,'XP Vault',NULL,'/learning','bi-book',4,1,'2026-07-26 06:56:20','2026-07-26 06:56:20','topbar'),(5,'Friends',NULL,'/friends','bi-people',5,1,'2026-07-26 06:56:20','2026-07-26 06:56:20','topbar'),(9,'Progress',NULL,'/internal/progress','bi-pie-chart-fill',6,1,'2026-08-16 07:37:22','2026-08-16 07:37:22','profileList'),(10,'Settings',NULL,'/internal/settings','bi-gear-fill',7,1,'2026-08-16 07:37:22','2026-08-16 07:37:22','profileList'),(11,'Logout',NULL,NULL,'bi-box-arrow-right',8,1,'2026-08-16 07:37:22','2026-08-16 07:37:22','profileList');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `bio` varchar(225) DEFAULT NULL,
  `snippets` int DEFAULT NULL,
  `solved` int DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `avatar_public_id` varchar(255) DEFAULT NULL,
  `avatar_secure_url` varchar(255) DEFAULT NULL,
  `banner_public_id` varchar(255) DEFAULT NULL,
  `banner_secure_url` varchar(255) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `joined_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'admin','Sachin Chaurasiya','Hii I am on Codesnippet, this is sachin and i am a web app developer using java spring boot,\nand the developer of Code Cabinate (this website)\n',0,0,'9833724659','mumbai','maharashtra','India','jmm infotech','avatar/vrncv9ocko4ajblk7mz2','https://res.cloudinary.com/drwjaxxyy/image/upload/v1786864978/avatar/vrncv9ocko4ajblk7mz2.jpg','banner/df1gq3hlntyficbeqonm','https://res.cloudinary.com/drwjaxxyy/image/upload/v1786864939/banner/df1gq3hlntyficbeqonm.jpg',NULL,'sachinchau444@gmail.com','2026-07-12 06:01:34.067047',1),(2,'sachin','sachin','Hii I am on Codesnippet',0,0,NULL,'','','','','avatar/n3wzosfhwhdfggpp9f82','https://res.cloudinary.com/drwjaxxyy/image/upload/v1784471431/avatar/n3wzosfhwhdfggpp9f82.jpg','avatar/ni8kmsawu1iz6bwxyuki','https://res.cloudinary.com/drwjaxxyy/image/upload/v1784471402/avatar/ni8kmsawu1iz6bwxyuki.jpg',NULL,NULL,'2026-07-12 06:03:00.940801',2);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  `addedon` datetime DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `UKgwfg24s75a3kgec0g5ol9lxa5` (`userid`,`title`),
  KEY `idx_title_name` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titles`
--

LOCK TABLES `titles` WRITE;
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` VALUES (1,'Specification example',1,'2026-08-23 09:04:23',0);
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bio` varchar(200) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `company` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `image` tinyblob,
  `username` varchar(25) NOT NULL,
  `number` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `website` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User') DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-07-12','sachinchau444@gmail.com','sachin','$2a$12$BhvxXCZhMJ9Js7EQ0XfL2.0UL/wF1OLLis0YahGPuLTt9RMCs2qp.','User','admin','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzYWNoaW5jaGF1NDQ0QGdtYWlsLmNvbSIsImlhdCI6MTc4Njg3ODI4OSwiZXhwIjoxNzg3NDgzMDg5fQ.3TLieM0u-g9WoHzh0AjCEcSVYbHCpXmIpT-E7BI-eg3VfBb4GsGKDHZND4FlHI9P'),(2,'2026-07-12','sachinchaurasiya5015@gmail.com','sachin','$2a$12$HPwJyhchp3QEgN4nNHWROOEqCxjOll.ntjahyVMN3M5n6RoDbze5q','User','sachin','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzYWNoaW5jaGF1cmFzaXlhNTAxNUBnbWFpbC5jb20iLCJpYXQiOjE3ODQ0NzIxNzgsImV4cCI6MTc4NTA3Njk3OH0.KPTtagWKAG4g25EcKifHyvxR3nANuO4Id8_RYPaWyVNcS5yqHzWLC7JPrZ_7cVMH');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-23 15:13:27
