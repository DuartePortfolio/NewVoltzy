CREATE DATABASE  IF NOT EXISTS `smart_energy_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `smart_energy_app`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: smart_energy_app
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `houses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contracted_power_kva` decimal(5,2) DEFAULT NULL,
  `has_upac` tinyint(1) NOT NULL DEFAULT '0',
  `upac_power_kw` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_houses_user` (`user_id`),
  CONSTRAINT `fk_houses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_rooms_house` (`house_id`),
  CONSTRAINT `fk_rooms_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lights`
--

DROP TABLE IF EXISTS `lights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lights` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int unsigned NOT NULL,
  `room_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_on` tinyint(1) NOT NULL DEFAULT '0',
  `brightness` tinyint unsigned NOT NULL DEFAULT '100',
  `color` char(7) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#FFFFFF',
  `power_consumption_watts` decimal(8,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_lights_house` (`house_id`),
  CONSTRAINT `fk_lights_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lights`
--

LOCK TABLES `lights` WRITE;
/*!40000 ALTER TABLE `lights` DISABLE KEYS */;
/*!40000 ALTER TABLE `lights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_routines`
--

DROP TABLE IF EXISTS `light_routines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `light_routines` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `color` char(7) COLLATE utf8mb4_unicode_ci DEFAULT '#78B85E',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `repeat_monday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_tuesday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_wednesday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_thursday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_friday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_saturday` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_sunday` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_routines_house` (`house_id`),
  CONSTRAINT `fk_routines_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_routines`
--

LOCK TABLES `light_routines` WRITE;
/*!40000 ALTER TABLE `light_routines` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_routines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_routine_lights`
--

DROP TABLE IF EXISTS `light_routine_lights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `light_routine_lights` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `routine_id` int unsigned NOT NULL,
  `light_id` int unsigned NOT NULL,
  `target_on` tinyint(1) NOT NULL DEFAULT '1',
  `brightness` tinyint unsigned DEFAULT NULL,
  `color_hex` char(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_routine_light` (`routine_id`,`light_id`),
  KEY `fk_lrl_light` (`light_id`),
  CONSTRAINT `fk_lrl_light` FOREIGN KEY (`light_id`) REFERENCES `lights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lrl_routine` FOREIGN KEY (`routine_id`) REFERENCES `light_routines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_routine_lights`
--

LOCK TABLES `light_routine_lights` WRITE;
/*!40000 ALTER TABLE `light_routine_lights` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_routine_lights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `energy_measurements`
--

DROP TABLE IF EXISTS `energy_measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_measurements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int unsigned NOT NULL,
  `measurement_time` datetime NOT NULL,
  `active_energy_import_kwh` decimal(12,5) NOT NULL DEFAULT '0.00000',
  `active_energy_export_kwh` decimal(12,5) NOT NULL DEFAULT '0.00000',
  `inst_active_power_import_kw` decimal(10,4) DEFAULT NULL,
  `inst_active_power_export_kw` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_house_time` (`house_id`,`measurement_time`),
  CONSTRAINT `fk_em_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `energy_measurements`
--

LOCK TABLES `energy_measurements` WRITE;
/*!40000 ALTER TABLE `energy_measurements` DISABLE KEYS */;
/*!40000 ALTER TABLE `energy_measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_energy_stats`
--

DROP TABLE IF EXISTS `current_energy_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_energy_stats` (
  `house_id` int unsigned NOT NULL,
  `lights_on_count` int unsigned NOT NULL DEFAULT '0',
  `current_consumption_kwh` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `today_consumption_kwh` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `today_saved_kwh` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`house_id`),
  CONSTRAINT `fk_ces_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_energy_stats`
--

LOCK TABLES `current_energy_stats` WRITE;
/*!40000 ALTER TABLE `current_energy_stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `current_energy_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hourly_consumption`
--

DROP TABLE IF EXISTS `hourly_consumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hourly_consumption` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int unsigned NOT NULL,
  `date` date NOT NULL,
  `hour` tinyint unsigned NOT NULL,
  `consumption_kwh` decimal(10,4) NOT NULL DEFAULT '0.0000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_house_date_hour` (`house_id`,`date`,`hour`),
  CONSTRAINT `fk_hc_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_hour` CHECK ((`hour` >= 0 and `hour` <= 23))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hourly_consumption`
--

LOCK TABLES `hourly_consumption` WRITE;
/*!40000 ALTER TABLE `hourly_consumption` DISABLE KEYS */;
/*!40000 ALTER TABLE `hourly_consumption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_consumption_log`
--

DROP TABLE IF EXISTS `light_consumption_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `light_consumption_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `light_id` int unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `consumption_kwh` decimal(10,6) NOT NULL DEFAULT '0.000000',
  `duration_seconds` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_lcl_light` (`light_id`),
  KEY `idx_timestamp` (`timestamp`),
  CONSTRAINT `fk_lcl_light` FOREIGN KEY (`light_id`) REFERENCES `lights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_consumption_log`
--

LOCK TABLES `light_consumption_log` WRITE;
/*!40000 ALTER TABLE `light_consumption_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_consumption_log` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-10 (Updated)