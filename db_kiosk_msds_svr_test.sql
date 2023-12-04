-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: db_kiosk_msds_svr_test
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'admin','Administrator'),(2,'members','General User'),(3,'manager','고객사');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_contents`
--

DROP TABLE IF EXISTS `k_contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int NOT NULL,
  `sub_category_id` int DEFAULT NULL,
  `depth` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '카테고리가 몇번쨰 까지 있는지\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n0~2 or 1~3',
  `sort` int NOT NULL COMMENT '순서',
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '제목',
  `desc` text COLLATE utf8_bin,
  `used` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_contents`
--

LOCK TABLES `k_contents` WRITE;
/*!40000 ALTER TABLE `k_contents` DISABLE KEYS */;
INSERT INTO `k_contents` VALUES (2,1,1,NULL,1,'2',NULL,0,'2023-11-22 01:29:07','2023-11-22 01:29:07','2023-11-21 07:55:08'),(3,1,1,NULL,1,'1',NULL,0,'2023-11-22 01:29:07','2023-11-22 01:29:07','2023-11-21 07:54:53'),(4,1,1,NULL,1,'3',NULL,0,'2023-11-22 01:29:07','2023-11-22 01:29:07','2023-11-21 07:55:03'),(5,1,1,NULL,1,'메인이미지',NULL,0,'2023-11-24 05:17:00','2023-11-24 05:17:00','2023-11-24 05:17:00'),(6,1,1,NULL,1,'컨텐츠1',NULL,0,'2023-11-24 05:16:58','2023-11-24 05:16:58','2023-11-24 05:16:58'),(7,1,1,NULL,1,'222222222',NULL,0,'2023-11-24 05:16:56','2023-11-24 05:16:56','2023-11-24 05:16:56'),(8,1,1,NULL,1,'123',NULL,0,'2023-11-24 05:16:54','2023-11-24 05:16:54','2023-11-24 05:16:54'),(9,1,1,NULL,1,'12',NULL,0,'2023-11-24 05:16:51','2023-11-24 05:16:51','2023-11-24 05:16:51'),(10,1,1,NULL,1,'ttttt',NULL,0,'2023-11-24 05:17:03','2023-11-24 05:17:03','2023-11-24 05:17:03'),(11,1,1,NULL,1,'111111111111111',NULL,0,'2023-11-24 05:17:05','2023-11-24 05:17:05','2023-11-24 05:17:05'),(12,1,1,NULL,1,'222222222222',NULL,0,'2023-11-24 05:17:08','2023-11-24 05:17:08','2023-11-24 05:17:08'),(13,1,1,NULL,1,'5555555555',NULL,0,'2023-11-24 05:17:11','2023-11-24 05:17:11','2023-11-24 05:17:11'),(14,2,2,NULL,1,'123',NULL,0,'2023-11-24 05:19:01','2023-11-24 05:19:01','2023-11-24 05:19:01'),(15,2,2,NULL,1,'zzzzzzzzz',NULL,0,'2023-11-24 05:18:59','2023-11-24 05:18:59','2023-11-24 05:18:59'),(16,2,3,NULL,1,'fsa',NULL,0,'2023-11-24 05:19:05','2023-11-24 05:19:05','2023-11-24 05:19:05'),(17,2,6,NULL,1,'1',NULL,0,'2023-11-24 05:19:13','2023-11-24 05:19:13','2023-11-24 05:19:13'),(18,2,47,NULL,1,'2222',NULL,0,'2023-11-24 08:33:13','2023-11-24 08:33:13','2023-11-24 05:19:08'),(19,1,1,NULL,1,'1번 동영상',NULL,0,'2023-11-24 05:21:56','2023-11-24 05:21:56','2023-11-24 05:21:56'),(20,1,1,NULL,1,'1번',NULL,0,'2023-11-24 05:30:58','2023-11-24 05:30:58','2023-11-24 05:30:58'),(21,1,1,NULL,1,'1번 동영상',NULL,0,'2023-11-24 05:31:12','2023-11-24 05:31:12',NULL),(22,1,1,NULL,2,'2번 동영상',NULL,0,'2023-11-24 05:32:58','2023-11-24 05:32:58',NULL),(23,2,2,NULL,1,'1',NULL,0,'2023-11-24 05:33:35','2023-11-24 05:33:35',NULL),(24,2,2,NULL,2,'2',NULL,0,'2023-11-24 05:33:44','2023-11-24 05:33:44',NULL),(25,2,2,NULL,3,'3',NULL,0,'2023-11-24 05:33:53','2023-11-24 05:33:53',NULL),(26,2,3,NULL,1,'1',NULL,0,'2023-11-24 05:34:08','2023-11-24 05:34:08',NULL),(27,2,47,NULL,1,'개요',NULL,0,'2023-11-24 08:33:13','2023-11-24 08:33:13',NULL),(28,2,5,NULL,1,'보건수칙',NULL,0,'2023-11-24 05:34:38','2023-11-24 05:34:38',NULL),(29,2,6,NULL,1,'1',NULL,0,'2023-11-24 05:34:49','2023-11-24 05:34:49',NULL),(30,2,6,NULL,2,'2',NULL,0,'2023-11-24 05:34:56','2023-11-24 05:34:56',NULL),(31,2,7,NULL,1,'응급처치요령',NULL,0,'2023-11-24 05:35:10','2023-11-24 05:35:10',NULL),(32,2,8,NULL,1,'보호구사용법',NULL,0,'2023-11-24 05:35:21','2023-11-24 05:35:21',NULL),(33,3,10,NULL,1,'피난 안내도',NULL,0,'2023-11-24 06:12:56','2023-11-24 06:12:56',NULL),(34,6,NULL,NULL,1,'123','<div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\">안녕하세요,&nbsp;<span style=\"margin: 0px; padding: 0px; color: rgb(0, 170, 0);\">네이버웍스</span>입니다.</div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\">​</div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\">네이버웍스 비정기 업데이트가 2023년 11월 24일(금)에 진행됩니다.</div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\">자세한 업데이트 사항은 아래 내용을 확인해 주시기 바랍니다.</div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\">​</div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\"><div>■ 업데이트 일정 : 2023년 11월 24일(금) 오후 2시경</div><div>※ 앱 노출 시간은 앱스토어 사정에 따라 상이할 수 있습니다.<br>※ Mobile앱은 선택 업데이트 방식으로 [Mobile앱 &gt; 더보기 &gt; 애플리케이션 정보]를 통해서도 최신 버전으로 업데이트 할 수 있습니다.</div><div>※ Drive탐색기는 선택 업데이트 방식으로 [작업표시줄 Tray 아이콘 &gt; 정보]에서도 최신 버전으로 업데이트 하실 수 있으며,</div><div>v3.8.5 이용자 대상으로는 안정적인 서비스 이용을 보장하기 위해 강제 업데이트를 진행합니다.</div></div><div style=\"color: rgb(34, 34, 34); font-family: &quot;Noto Sans Korea&quot;, &quot;Nanum Gothic&quot;, NanumGothic, 나눔고딕, sans-serif; font-size: 20px; letter-spacing: -1px;\"><div>​11111111111111111111111111111</div><div>■ 업데이트 내용</div><div><p style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 0px; line-height: 0.34rem; font-size: 0.2rem; letter-spacing: -0.01rem;\"><iframe class=\"wp-embedded-content\" sandbox=\"allow-scripts\" security=\"restricted\" title=\"“네이버웍스 비정기 업데이트 소식” — 네이버웍스\" src=\"https://naver.worksmobile.com/release-notes/20231124/embed/#?secret=HOM6lxNh0l\" data-secret=\"HOM6lxNh0l\" width=\"500\" height=\"339\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"border-width: 0px; border-style: initial;\"></iframe></p></div></div>',0,'2023-11-24 09:17:51','2023-11-24 09:17:51','2023-11-24 09:17:51'),(35,6,NULL,NULL,1,'111111111111','<p><img src=\"/uploads/notice/1700814317_208f5f018f9e7822d73e.jpg\" style=\"width: 50%;\"></p><p>zzzzzz<img src=\"/uploads/notice/1700815134_aaf2f66806435a5af893.jpg\"></p>',0,'2023-11-24 09:17:51','2023-11-24 09:17:51',NULL),(36,2,47,NULL,1,'s',NULL,0,'2023-11-24 08:33:13','2023-11-24 08:33:13','2023-11-24 08:33:13');
/*!40000 ALTER TABLE `k_contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_files`
--

DROP TABLE IF EXISTS `k_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL COMMENT '컨텐츠 id',
  `org_file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '원본이름',
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `file_ext` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '확장자',
  `file_type` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `file_size` int DEFAULT NULL COMMENT '용량 MB 기준',
  `file_number` int DEFAULT NULL COMMENT '다중업로드 시 순서.',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_files`
--

LOCK TABLES `k_files` WRITE;
/*!40000 ALTER TABLE `k_files` DISABLE KEYS */;
INSERT INTO `k_files` VALUES (1,2,'2023_06_29 09_05.mp4','1700547489_e176da10008d223aaf1f.mp4','/uploads/main/contents/1700547489_e176da10008d223aaf1f.mp4','mp4','video/mp4',6,1,'2023-11-21 07:55:08','2023-11-21 07:55:08','2023-11-21 07:55:08'),(2,3,'video_02.mp4','1700547615_e795ac8cc948516d39cb.mp4','/uploads/main/contents/1700547615_e795ac8cc948516d39cb.mp4','mp4','video/mp4',100,1,'2023-11-21 07:54:54','2023-11-21 07:54:54','2023-11-21 07:54:54'),(3,4,'video_04.mp4','1700548593_81ea561e4a086d75d538.mp4','/uploads/main/contents/1700548593_81ea561e4a086d75d538.mp4','mp4','video/mp4',79,1,'2023-11-21 07:55:03','2023-11-21 07:55:03','2023-11-21 07:55:03'),(4,5,'video_02.mp4','1700553354_9c518908c3aca29ecc84.mp4','/uploads/main/contents/1700553354_9c518908c3aca29ecc84.mp4','mp4','video/mp4',100,1,'2023-11-24 05:17:00','2023-11-24 05:17:00','2023-11-24 05:17:00'),(5,6,'video_03.mp4','1700553376_d22d647ce7799c73be83.mp4','/uploads/main/contents/1700553376_d22d647ce7799c73be83.mp4','mp4','video/mp4',60,1,'2023-11-24 05:16:58','2023-11-24 05:16:58','2023-11-24 05:16:58'),(6,7,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700554089_ef2797350a1a51ebb522.png','/uploads/main/contents/1700554089_ef2797350a1a51ebb522.png','png','image/png',0,1,'2023-11-21 08:32:48','2023-11-21 08:32:48','2023-11-21 08:32:48'),(7,7,'video_02.mp4','1700555568_2be5cd73de7eee84399a.mp4','/uploads/main/contents/1700555568_2be5cd73de7eee84399a.mp4','mp4','video/mp4',100,1,'2023-11-21 08:33:06','2023-11-21 08:33:06','2023-11-21 08:33:06'),(8,7,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700555586_93b5f2002943ce3453a7.png','/uploads/main/contents/1700555586_93b5f2002943ce3453a7.png','png','image/png',0,1,'2023-11-24 05:16:56','2023-11-24 05:16:56','2023-11-24 05:16:56'),(9,8,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700616333_637b2f6bac9676174cf6.png','/uploads/main/contents/1700616333_637b2f6bac9676174cf6.png','png','image/png',0,1,'2023-11-24 05:16:54','2023-11-24 05:16:54','2023-11-24 05:16:54'),(10,9,'video_04.mp4','1700616532_1878c9cdf7591127d62f.mp4','/uploads/main/contents/1700616532_1878c9cdf7591127d62f.mp4','mp4','video/mp4',79,1,'2023-11-24 05:16:51','2023-11-24 05:16:51','2023-11-24 05:16:51'),(11,10,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700619620_89a61313bedcd1a67690.png','/uploads/main/contents/1700619620_89a61313bedcd1a67690.png','png','image/png',0,1,'2023-11-24 05:17:03','2023-11-24 05:17:03','2023-11-24 05:17:03'),(12,11,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700619634_8d908fce9b2e6587d88d.png','/uploads/main/contents/1700619634_8d908fce9b2e6587d88d.png','png','image/png',0,1,'2023-11-24 05:17:05','2023-11-24 05:17:05','2023-11-24 05:17:05'),(13,12,'pexels_videos_2402371 (1080p) (1).mp4','1700619641_0efd22ca6653c052ab5a.mp4','/uploads/main/contents/1700619641_0efd22ca6653c052ab5a.mp4','mp4','video/mp4',4,1,'2023-11-24 05:17:08','2023-11-24 05:17:08','2023-11-24 05:17:08'),(14,13,'pexels-moti-segev-18265707 (Original).mp4','1700619989_b04b3f31d027dcce2bea.mp4','/uploads/main/contents/1700619989_b04b3f31d027dcce2bea.mp4','mp4','video/mp4',510,1,'2023-11-22 02:26:54','2023-11-22 02:26:54','2023-11-22 02:26:54'),(15,13,'2.(예시이미지) Dynaview 썸네일_(400x400).png','1700620014_b8e9598d23554c70fea3.png','/uploads/main/contents/1700620014_b8e9598d23554c70fea3.png','png','image/png',0,1,'2023-11-24 05:17:11','2023-11-24 05:17:11','2023-11-24 05:17:11'),(16,14,'ANDROID 13.0 로고, 애니메이션, 배경화면 변경 방법 (1).pdf','1700620221_f724f3d6774480aa734a.pdf','/uploads/msds/reference/1700620221_f724f3d6774480aa734a.pdf','pdf','application/pdf',0,1,'2023-11-24 05:19:01','2023-11-24 05:19:01','2023-11-24 05:19:01'),(17,15,'Atom Player 사용자 설명서.pdf','1700620275_3215ea920496d553c2e2.pdf','/uploads/msds/reference/1700620275_3215ea920496d553c2e2.pdf','pdf','application/pdf',0,1,'2023-11-24 05:18:59','2023-11-24 05:18:59','2023-11-24 05:18:59'),(18,16,'GS2023-00017_GS인증 신청서_K2YMZm.pdf','1700620370_8e42cc8a059caf357af7.pdf','/uploads/msds/trick/1700620370_8e42cc8a059caf357af7.pdf','pdf','application/pdf',0,1,'2023-11-24 05:19:05','2023-11-24 05:19:05','2023-11-24 05:19:05'),(19,17,'video_04.mp4','1700646604_36c2b09aaad41a1d05ca.mp4','/uploads/msds/video/1700646604_36c2b09aaad41a1d05ca.mp4','mp4','video/mp4',79,1,'2023-11-24 05:19:13','2023-11-24 05:19:13','2023-11-24 05:19:13'),(20,18,'공식 홈페이지 수정 요청 사항_3차.pdf','1700714389_63eaa96acbf869017379.pdf','/uploads/msds/outline/1700714389_63eaa96acbf869017379.pdf','pdf','application/pdf',0,1,'2023-11-24 05:19:08','2023-11-24 05:19:08','2023-11-24 05:19:08'),(21,19,'TV_CAM_20160404_kbs.mp4','1700803274_9571b59b4308f501f251.wmv','/uploads/main/contents/1700803274_9571b59b4308f501f251.wmv','wmv','video/x-ms-asf',74,1,'2023-11-24 05:21:56','2023-11-24 05:21:56','2023-11-24 05:21:56'),(22,20,'TV_CAM_20160404_kbs.mp4','1700803387_cc7b7cc24bf94cd0ea62.wmv','/uploads/main/contents/1700803387_cc7b7cc24bf94cd0ea62.wmv','wmv','video/x-ms-asf',74,1,'2023-11-24 05:30:58','2023-11-24 05:30:58','2023-11-24 05:30:58'),(23,21,'TV_CAM_20160404_kbs.mp4','1700803872_629e3bb89ccc72e0d5f4.mp4','/uploads/main/contents/1700803872_629e3bb89ccc72e0d5f4.mp4','mp4','video/mp4',109,1,'2023-11-24 05:31:12','2023-11-24 05:31:12',NULL),(24,22,'TV_CAM_20160411_kbs.mp4','1700803978_50da7d3e2db8643bb22c.mp4','/uploads/main/contents/1700803978_50da7d3e2db8643bb22c.mp4','mp4','video/mp4',123,1,'2023-11-24 05:32:58','2023-11-24 05:32:58',NULL),(25,23,'A_SingleMsds.pdf','1700804015_a32ee35170680467f199.pdf','/uploads/msds/reference/1700804015_a32ee35170680467f199.pdf','pdf','application/pdf',0,1,'2023-11-24 05:33:35','2023-11-24 05:33:35',NULL),(26,24,'1601866879_6ee16fe3643aca725533.pdf','1700804024_9834e9ca8fe04e2a89c8.pdf','/uploads/msds/reference/1700804024_9834e9ca8fe04e2a89c8.pdf','pdf','application/pdf',1,1,'2023-11-24 05:33:44','2023-11-24 05:33:44',NULL),(27,25,'1601866850_f747027ef48adf16bc2a.pdf','1700804033_4cc6a3aeba96cb03245a.pdf','/uploads/msds/reference/1700804033_4cc6a3aeba96cb03245a.pdf','pdf','application/pdf',1,1,'2023-11-24 05:33:53','2023-11-24 05:33:53',NULL),(28,26,'공정별 관리요령.pdf','1700804048_244500195780f3d6fdaa.pdf','/uploads/msds/trick/1700804048_244500195780f3d6fdaa.pdf','pdf','application/pdf',0,1,'2023-11-24 05:34:08','2023-11-24 05:34:08',NULL),(29,27,'공정개요.pdf','1700804063_f6316d0307818d624efd.pdf','/uploads/msds/outline/1700804063_f6316d0307818d624efd.pdf','pdf','application/pdf',2,1,'2023-11-24 05:34:23','2023-11-24 05:34:23',NULL),(30,28,'안전보건수칙.pdf','1700804078_3409eb0f8b4fc1805007.pdf','/uploads/msds/rule/1700804078_3409eb0f8b4fc1805007.pdf','pdf','application/pdf',11,1,'2023-11-24 05:34:38','2023-11-24 05:34:38',NULL),(31,29,'TV_CAM_20160404_kbs.mp4','1700804089_7ea0c4a3273b6c404ce7.mp4','/uploads/msds/video/1700804089_7ea0c4a3273b6c404ce7.mp4','mp4','video/mp4',109,1,'2023-11-24 05:34:49','2023-11-24 05:34:49',NULL),(32,30,'TV_CAM_20160411_kbs.mp4','1700804096_7450fd67cb2c18c7f9f7.mp4','/uploads/msds/video/1700804096_7450fd67cb2c18c7f9f7.mp4','mp4','video/mp4',123,1,'2023-11-24 05:34:56','2023-11-24 05:34:56',NULL),(33,31,'응급처치요령.pdf','1700804110_397af98326c9c880c61a.pdf','/uploads/msds/emergency/1700804110_397af98326c9c880c61a.pdf','pdf','application/pdf',20,1,'2023-11-24 05:35:10','2023-11-24 05:35:10',NULL),(34,32,'보호구사용법.pdf','1700804121_5564d8dbefb5936e35dc.pdf','/uploads/msds/shield/1700804121_5564d8dbefb5936e35dc.pdf','pdf','application/pdf',0,1,'2023-11-24 05:35:21','2023-11-24 05:35:21',NULL),(35,33,'피난안내도.jpg','1700806376_7b09ef9d807bc9bb95e9.jpg','/uploads/flee/guide/1700806376_7b09ef9d807bc9bb95e9.jpg','jpg','image/jpeg',0,1,'2023-11-24 06:12:56','2023-11-24 06:12:56',NULL),(36,36,'안정장비자가진단.pdf','1700814784_b520d7cb7036ef8256d2.pdf','/uploads/msds/outline/1700814784_b520d7cb7036ef8256d2.pdf','pdf','application/pdf',2,1,'2023-11-24 08:33:13','2023-11-24 08:33:13','2023-11-24 08:33:13');
/*!40000 ALTER TABLE `k_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_main_category`
--

DROP TABLE IF EXISTS `k_main_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_main_category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `url` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '0 = 대기화면\\\\n1 = 기본',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_main_category`
--

LOCK TABLES `k_main_category` WRITE;
/*!40000 ALTER TABLE `k_main_category` DISABLE KEYS */;
INSERT INTO `k_main_category` VALUES (1,'메인 페이지','main','1','2023-11-20 06:46:24',NULL,NULL),(2,'안전 보건 정보','msds','1','2023-11-20 06:46:24',NULL,NULL),(3,'피난 안내도','flee','1','2023-11-20 06:46:24',NULL,NULL),(4,'비상전화','call','1','2023-11-24 06:42:42',NULL,NULL),(5,'사업장 무재해 현황','report','1','2023-11-20 06:46:24',NULL,NULL),(6,'공지사항','notice','1','2023-11-20 06:46:24',NULL,NULL),(7,'설정','setting','1','2023-11-20 06:46:24',NULL,NULL);
/*!40000 ALTER TABLE `k_main_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_setting`
--

DROP TABLE IF EXISTS `k_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `call_number` varchar(45) COLLATE utf8_bin NOT NULL,
  `target_date` date DEFAULT NULL,
  `auto_change_status` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT 'true' COMMENT 'false=전환안함\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n  true=전환',
  `auto_change_time` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '분단위',
  `main_status` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT 'true' COMMENT 'false=전환안함\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n  true=전환',
  `main_change_time` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '초단위',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_setting`
--

LOCK TABLES `k_setting` WRITE;
/*!40000 ALTER TABLE `k_setting` DISABLE KEYS */;
INSERT INTO `k_setting` VALUES (1,'01041589272','2023-11-30','true',NULL,'true',NULL);
/*!40000 ALTER TABLE `k_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `k_sub_category`
--

DROP TABLE IF EXISTS `k_sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `k_sub_category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `main_idx` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '메인카테고리 idx',
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sort` int NOT NULL,
  `type` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `url` varchar(45) COLLATE utf8_bin NOT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '이거보다 하위가 있으면 1 없으면 0 ',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `k_sub_category`
--

LOCK TABLES `k_sub_category` WRITE;
/*!40000 ALTER TABLE `k_sub_category` DISABLE KEYS */;
INSERT INTO `k_sub_category` VALUES (1,'1','컨텐츠',1,'.png,.jpg,.avi,.mp4','contents',0,'2023-11-24 05:29:24',NULL,NULL),(2,'2','물질안전 보건자료',1,'.pdf','reference',0,'2023-11-23 04:38:58',NULL,NULL),(3,'2','공정별 관리요령',2,'.pdf','trick',0,'2023-11-23 04:38:58',NULL,NULL),(5,'2','안전보건수칙',4,'.pdf','rule',0,'2023-11-23 04:38:58',NULL,NULL),(6,'2','안전동영상',5,'.avi,.mp4','video',0,'2023-11-24 05:29:24',NULL,NULL),(7,'2','응급처치요령',6,'.pdf','emergency',0,'2023-11-23 04:38:58',NULL,NULL),(8,'2','보호구 사용법',7,'.pdf','shield',0,'2023-11-23 04:38:58',NULL,NULL),(9,'2','안전장비 자가진단',8,NULL,'diagnosis',0,'2023-11-23 04:38:58',NULL,NULL),(10,'3','피난안내도',1,'.jpg,.png','guide',0,'2023-11-24 06:09:32',NULL,NULL),(12,'4','비상 전화 QR코드',1,NULL,'qrcode',0,'2023-11-24 06:19:08',NULL,NULL),(13,'5','현황판',1,NULL,'state',0,'2023-11-23 04:38:58',NULL,NULL),(47,'2','공정개요',3,'.pdf','outline',0,'2023-11-23 04:38:58',NULL,NULL);
/*!40000 ALTER TABLE `k_sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_attempts` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `login` varchar(100) DEFAULT NULL,
  `time` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(255) NOT NULL,
  `class` text NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int NOT NULL,
  `batch` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'20181211100537','IonAuth\\Database\\Migrations\\Migration_Install_ion_auth','','IonAuth',1594278913,1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `activation_selector` varchar(255) DEFAULT NULL,
  `activation_code` varchar(255) DEFAULT NULL,
  `forgotten_password_selector` varchar(255) DEFAULT NULL,
  `forgotten_password_code` varchar(255) DEFAULT NULL,
  `forgotten_password_time` int unsigned DEFAULT NULL,
  `remember_selector` varchar(255) DEFAULT NULL,
  `remember_code` varchar(255) DEFAULT NULL,
  `created_on` int unsigned NOT NULL,
  `last_login` int unsigned DEFAULT NULL,
  `active` tinyint unsigned DEFAULT NULL,
  `all_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `hidden_status` int DEFAULT '0' COMMENT '숨김관리자 = 1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `activation_selector` (`activation_selector`),
  UNIQUE KEY `forgotten_password_selector` (`forgotten_password_selector`),
  UNIQUE KEY `remember_selector` (`remember_selector`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'127.0.0.1','admin','$2y$12$mIsJivJbFw9GKacSdIk8s.7AVS0awL2Cg2Jm6JvGgDSoj5Gq5mpMa','admin@admin.com',NULL,'',NULL,NULL,NULL,NULL,NULL,1268889823,1701392186,1,'관리자','리자','관','ADMIN','1234',0),(3,'127.0.0.1','test','$2y$10$.9hE3eZKrKuz7ZIBTaRNu.EcZslfOpFsEeVDLetjUgS8DC1tnsEzS','test@test.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1594345887,1610504989,1,'테스트','스트','테','test','',0),(4,'192.168.0.1','sysmate','$2y$12$l.5gR5ph.rqmu4UzkNhXBeEknDvpzmZ0/Q3IXJKUbUSdHo.OWTKIO','sysmate@sysmate.co.kr',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1610500951,1610582943,1,'시스메이트',NULL,NULL,'','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_groups` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint unsigned NOT NULL,
  `group_id` mediumint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_groups_user_id_foreign` (`user_id`),
  KEY `users_groups_group_id_foreign` (`group_id`),
  CONSTRAINT `users_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
INSERT INTO `users_groups` VALUES (37,3,3),(45,4,1),(46,4,2),(47,4,3),(48,1,1),(49,1,2),(50,1,3);
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 13:19:12
