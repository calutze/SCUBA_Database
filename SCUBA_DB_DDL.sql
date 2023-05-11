-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET AUTOCOMMIT = 0;


-- Create Divers table, SAC stands for Surface Air Consumption

CREATE OR REPLACE TABLE Divers (
  `diver_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `diver_age` TINYINT(3) NOT NULL,
  `avg_SAC` INT NULL,
  `num_dives` INT NULL,
  `total_dive_time` INT NULL,
  PRIMARY KEY (`diver_id`))
ENGINE = InnoDB;

-- Create DiveSites table

CREATE OR REPLACE TABLE DiveSites (
  `divesite_id` INT NOT NULL AUTO_INCREMENT,
  `site_name` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `avg_site_rating` INT NULL,
  PRIMARY KEY (`divesite_id`))
ENGINE = InnoDB;


CREATE OR REPLACE TABLE Gear (
  `gear_id` INT NOT NULL AUTO_INCREMENT,
  `exposure_suit` VARCHAR(45) NULL,
  `boots` VARCHAR(45) NULL,
  `gloves` VARCHAR(45) NULL,
  `hood` VARCHAR(45) NULL,
  `fins` VARCHAR(45) NULL,
  `bcd` VARCHAR(45) NULL,
  `regulator` VARCHAR(45) NULL,
  `diver_id` INT NOT NULL,
  PRIMARY KEY (`gear_id`),
  INDEX `fk_Gear_Divers1_idx` (`diver_id` ASC) VISIBLE,
  CONSTRAINT `fk_Gear_Divers1`
    FOREIGN KEY (`diver_id`)
    REFERENCES `Divers` (`diver_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- SAC stands for Surface Air/Gas Consumption rate which is a normalized gas consumption rate

CREATE OR REPLACE TABLE Dives (
  `dive_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `max_depth` INT NOT NULL,
  `avg_depth` INT NULL,
  `duration` INT NOT NULL,
  `start_pressure` INT NULL,
  `end_pressure` INT NULL,
  `gas_type` VARCHAR(45) NULL,
  `SAC` INT NULL,
  `weight` INT NULL,
  `water_temperature` INT NULL,
  `visibility` INT NULL,
  `entry_details` VARCHAR(50) NULL,
  `condition_note` VARCHAR(500) NULL,
  `note` VARCHAR(2000) NULL,
  `site_rating` INT NULL,
  PRIMARY KEY (`dive_id`))
ENGINE = InnoDB;



CREATE OR REPLACE TABLE Divelogs (
  `divelog_id` INT NOT NULL AUTO_INCREMENT,
  `dive_id` INT NOT NULL,
  `diver_id` INT NOT NULL,
  `gear_id` INT,
  INDEX `fk_Dives_has_Divers_Divers1_idx` (`diver_id` ASC) VISIBLE,
  INDEX `fk_Dives_has_Divers_Dives1_idx` (`dive_id` ASC) VISIBLE,
  PRIMARY KEY (`divelog_id`),
  INDEX `fk_DiversToDives_Gear1_idx` (`gear_id` ASC) VISIBLE,
  CONSTRAINT `fk_Dives_has_Divers_Dives1`
    FOREIGN KEY (`dive_id`)
    REFERENCES `Dives` (`dive_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Dives_has_Divers_Divers1`
    FOREIGN KEY (`diver_id`)
    REFERENCES `Divers` (`diver_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_DiversToDives_Gear1`
    FOREIGN KEY (`gear_id`)
    REFERENCES `Gear` (`gear_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


CREATE OR REPLACE TABLE DiveToDiveSites (
  `dives_to_divesites_id` INT NOT NULL AUTO_INCREMENT,
  `dive_id` INT NOT NULL,
  `divesite_id` INT NOT NULL,
  PRIMARY KEY (`dives_to_divesites_id`),
  INDEX `fk_Dives_has_DiveSites_DiveSites1_idx` (`divesite_id` ASC) VISIBLE,
  INDEX `fk_Dives_has_DiveSites_Dives1_idx` (`dive_id` ASC) VISIBLE,
  CONSTRAINT `fk_Dives_has_DiveSites_Dives1`
    FOREIGN KEY (`dive_id`)
    REFERENCES `Dives` (`dive_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Dives_has_DiveSites_DiveSites1`
    FOREIGN KEY (`divesite_id`)
    REFERENCES `DiveSites` (`divesite_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- Insert Data Into Tables
INSERT INTO Divers (first_name, second_name, diver_age)
values ('Jacques', 'Cousteau', 29), 
('Syliva', 'Earle', 87),
('Jerry', 'Garcia', 52),
('Greg', 'Louganis', 63),
('Chris', 'Lutze', 29);

INSERT INTO DiveSites (site_name, city, country)
values ('Golden Arches', 'Kona', 'United States'), 
('Casino Point', 'Catalina', 'United States'),
('Metridium Fields', 'Monterey', 'United States'),
('Texas', 'Roatan', 'Honduras'),
('Flame Reef', 'Santa Cruz Island', 'United States');

INSERT INTO Gear (exposure_suit, boots, gloves, hood, fins, bcd, regulator, diver_id)
values ('7mm Full Suit', '5mm Boots', '3mm Gloves', '3mm Hood', 'RK3', 'ScubaPro HydrosPro w/ Air2', 'Mares', 1), 
('Dry Suit', NULL, '3mm Gloves', '3mm Hood', 'RK3', 'ScubaPro HydrosPro w/ Air2', 'Mares', 1),
('3/4mm Full Suit', NULL, NULL, NULL, 'RK3', 'Mares Rover Pro', 'Mares Rover 2S', 2),
('Rash Guard', NULL, NULL, NULL, 'RK3', 'ScubaPro HydrosPro w/ Air2', 'Mares', 5);

INSERT INTO Dives (duration, max_depth, avg_depth, start_pressure, end_pressure, weight, water_temperature, visibility, note, date, SAC, gas_type, entry_details, site_rating)
values (32, 62, NULL, 3000, 1000, 37, 55, 20, 'The sea floor was covered in brittle star and sea stars. We say a few schools of fish swimming through. Successfully managed to navigate in a half circle back to the boat anchor throughout the site. The kelp was so tall. We saw a bat ray towards the end of the dive cruising around 40 feet deep.',
 '2019-05-26', NULL, 'Air', 'Boat', 3),
(50, 32, 24, 3200, 1200, 18, 54, 10, 'Swam out along in kelp beds I saw some yellow nudibranches and some white nudibranchs, and a white small slug?. Saw a fair amount of decorator crabs, sea cucumbers, and rock fish, a sea lion, lots of brittle stars. I started to get cold towards the end of the dive but was not shivering.',
 '2021-01-16', NULL, 'Air', 'Shore', 3),

INSERT INTO Divelogs (dive_id, diver_id, gear_id)
values (1, 1, 2),
(2, 2, NULL);

INSERT INTO DiveToDiveSites (dive_id, divesite_id)
values (1, (select divesite_id from DiveSites where site_name = 'Flame Reef')),
(2, (select divesite_id from DiveSites where site_name = 'Metridium Fields'));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
COMMIT;

