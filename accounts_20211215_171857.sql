-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE DATABASE "accounts" ------------------------------
CREATE DATABASE IF NOT EXISTS `accounts` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `accounts`;
-- ---------------------------------------------------------


-- CREATE TABLE "account" --------------------------------------
CREATE TABLE `account`( 
	`id` BigInt( 0 ) AUTO_INCREMENT NOT NULL,
	`number` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`type` Enum( 'ca', 'pa', 'ac' ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'ca',
	`initial_balance` Double( 22, 0 ) NOT NULL,
	`balance` Double( 22, 0 ) NOT NULL,
	`description` VarChar( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `unique_pk` UNIQUE( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 26;
-- -------------------------------------------------------------


-- CREATE TABLE "transaction" ----------------------------------
CREATE TABLE `transaction`( 
	`id` BigInt( 0 ) AUTO_INCREMENT NOT NULL,
	`number` BigInt( 0 ) NOT NULL,
	`date` Date NOT NULL,
	`amount` Double( 22, 0 ) NOT NULL,
	`description` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`id_source` BigInt( 0 ) NOT NULL,
	`id_destination` BigInt( 0 ) NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `unique_number` UNIQUE( `number` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 46;
-- -------------------------------------------------------------


-- Dump data of "account" ----------------------------------
BEGIN;

INSERT INTO `account`(`id`,`number`,`type`,`initial_balance`,`balance`,`description`) VALUES 
( '1', '0003', 'ca', '10000', '20835', 'account' ),
( '3', '0002', 'ca', '10000', '4165', 'account' ),
( '25', '0001', 'ca', '10000', '5000', 'account 001' ),
( '26', '1', 'ca', '10000', '10000', 'desc1' );
COMMIT;
-- ---------------------------------------------------------


-- Dump data of "transaction" ------------------------------
BEGIN;

INSERT INTO `transaction`(`id`,`number`,`date`,`amount`,`description`,`id_source`,`id_destination`) VALUES 
( '1', '12', '2021-09-27', '100', 'desc1', '1', '3' ),
( '5', '13', '2021-09-27', '100', 'desc1', '1', '3' ),
( '6', '99', '2021-09-27', '100', 'desc1', '1', '3' ),
( '8', '98', '2021-09-27', '100', 'desc1', '1', '3' ),
( '10', '11', '2021-09-27', '100', 'desc1', '1', '3' ),
( '37', '44', '2021-09-27', '12', 'asdas', '1', '3' ),
( '39', '45', '2021-09-27', '9000', 'asdas', '1', '3' ),
( '40', '55', '2021-09-27', '5000', '5000 tr', '25', '3' ),
( '41', '77', '2021-09-28', '250', 'ad', '3', '1' ),
( '43', '991', '2021-10-12', '20000', 'test', '3', '1' ),
( '44', '112', '2021-10-12', '1', '12312312', '1', '3' ),
( '45', '1122', '2021-10-12', '1', '12312312', '1', '3' ),
( '46', '1123', '2021-10-12', '1', '12312312', '1', '3' );
COMMIT;
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_account_transaction" ----------------------
CREATE INDEX `lnk_account_transaction` USING BTREE ON `transaction`( `id_source` );
-- -------------------------------------------------------------


-- CREATE INDEX "lnk_account_transaction_2" --------------------
CREATE INDEX `lnk_account_transaction_2` USING BTREE ON `transaction`( `id_destination` );
-- -------------------------------------------------------------



delimiter $$$ 
-- CREATE TRIGGER "transactions_AFTER_INSERT" ------------------
CREATE DEFINER=`root`@`localhost` TRIGGER `transactions_AFTER_INSERT` AFTER INSERT ON `transaction` FOR EACH ROW BEGIN
	UPDATE `account` SET account.balance = account.balance - NEW.amount
    WHERE account.id = NEW.id_source;
    UPDATE `account` SET account.balance = account.balance + NEW.amount
    WHERE account.id = NEW.id_destination;

END;
-- -------------------------------------------------------------

$$$ delimiter ;


-- CREATE LINK "lnk_account_transaction" -----------------------
ALTER TABLE `transaction`
	ADD CONSTRAINT `lnk_account_transaction` FOREIGN KEY ( `id_source` )
	REFERENCES `account`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- -------------------------------------------------------------


-- CREATE LINK "lnk_account_transaction_2" ---------------------
ALTER TABLE `transaction`
	ADD CONSTRAINT `lnk_account_transaction_2` FOREIGN KEY ( `id_destination` )
	REFERENCES `account`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- -------------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


