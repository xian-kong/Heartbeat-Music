SET NAMES UTF8;
DROP DATABASE IF EXISTS hb;
CREATE DATABASE hb CHARSET=UTF8;
USE hb;
-- 用户表
CREATE TABLE hb_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname varchar(30),
	pass varchar(15),
	phone varchar(15),
	email varchar(50),
	avatar varchar(128)
);
INSERT INTO hb_user VALUES(1,'hearlisten','123456','13555555555','hearlisten@qq.com','../../public/imgs/avatar/avatar_default.jpg'); 

-- 轮播图
CREATE TABLE carousel(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	cpic varchar(128)
);
INSERT INTO carousel VALUES("1","c1.jpg");
INSERT INTO carousel VALUES("2","c2.jpg");
INSERT INTO carousel VALUES("3","c3.jpg");
INSERT INTO carousel VALUES("4","c4.jpg");
INSERT INTO carousel VALUES("5","c5.jpg");
INSERT INTO carousel VALUES("6","c6.jpg");

-- 热门推荐
CREATE TABLE hot_rec(
	hrid INT PRIMARY KEY AUTO_INCREMENT,
	hrtit varchar(50),
	hrpic varchar(128),
	hrdetails varchar(128),
	hraudio varchar(128)
);
INSERT INTO hot_rec VALUES
	("1","蕾哈娜","rihanna.jpg","你无法超越的rihanna","EminemRihanna - The Monster.mp3");
INSERT INTO hot_rec VALUES
	("2","Gem邓紫棋","gem1.jpg","神级歌者邓紫棋","G.E.M. 邓紫棋 - 光年之外.mp3");
INSERT INTO hot_rec VALUES
	("3","The Pussycat Dolls","The Pussycat Dolls.jpg","曾经的小野猫组合","The Pussycat Dolls - Hush Hush.mp3");
INSERT INTO hot_rec VALUES
	("4","岑宁儿","zhuiguangzhe.jpg","做一个追光者","岑宁儿 - 追光者.mp3");
INSERT INTO hot_rec VALUES
	("5","鹿先森乐队","lusir.jpg","所有的都不如你","鹿先森乐队 - 春风十里.mp3");
INSERT INTO hot_rec VALUES
	("6","攀登组合","pandeng.jpg","神级rap刺破你的耳膜","潘玮柏 _ G.E.M. 邓紫棋 _ 艾热 - 攀登 (Live).wav");
INSERT INTO hot_rec VALUES
	("7","周笔畅","bibi.jpg","用尽我的一切奔向你","周笔畅 - 用尽我的一切奔向你.mp3");
INSERT INTO hot_rec VALUES
	("8","周深","zhoushen.jpg","曾经拥有，沧海桑田","周深 - 曾经沧海.mp3");

-- 排行榜飙升榜
CREATE TABLE rank_first(
	rfid INT PRIMARY KEY AUTO_INCREMENT,
	rftit varchar(50)
);
INSERT INTO rank_first VALUES("1","光年之外");
INSERT INTO rank_first VALUES("2","The Monster");
INSERT INTO rank_first VALUES("3","攀登(Live)");
INSERT INTO rank_first VALUES("4","春风十里");
INSERT INTO rank_first VALUES("5","追光者");
INSERT INTO rank_first VALUES("6","Hush Hush");
INSERT INTO rank_first VALUES("7","曾经沧海");
INSERT INTO rank_first VALUES("8","用尽我的一切奔向你");