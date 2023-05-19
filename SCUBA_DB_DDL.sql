-- Authored by Chris Lutze and Justin Ngo
-- Data Definition Queries for Super Cool Underwater Buddy Application (SCUBA) Database

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Create Divers table, SAC stands for Surface Air Consumption

CREATE OR REPLACE TABLE Divers (
  `diver_id` INT NOT NULL AUTO_INCREMENT,
  `diver_name` VARCHAR(100) NOT NULL,
  `diver_age` TINYINT(3) NOT NULL,
  `avg_SAC` DECIMAL(3,1) NULL, -- Calculated Value. SAC stands for Surface Air/Gas Consumption rate which is a normalized gas consumption rate
  `num_dives` INT NULL, -- Calculated Value
  `total_dive_time` INT NULL, -- Calculated Value
  PRIMARY KEY (`diver_id`))
ENGINE = InnoDB;

-- Create DiveSites table

CREATE OR REPLACE TABLE DiveSites (
  `divesite_id` INT NOT NULL AUTO_INCREMENT,
  `site_name` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `avg_site_rating` INT NULL, -- Calculated Value
  PRIMARY KEY (`divesite_id`))
ENGINE = InnoDB;

-- Create Units Table

CREATE OR REPLACE TABLE Units (
  `unit_id` INT NOT NULL AUTO_INCREMENT,
  `pressure_unit` VARCHAR(10) NOT NULL,
  `length_unit` VARCHAR(10) NOT NULL,
  `weight_unit` VARCHAR(10) NOT NULL,
  `temperature_unit` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`unit_id`))
  ENGINE = InnoDB;

-- Create Dives table

CREATE OR REPLACE TABLE Dives (
  `dive_id` INT NOT NULL AUTO_INCREMENT,
  `unit_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `max_depth` INT NOT NULL,
  `avg_depth` INT NULL,
  `duration` INT NOT NULL,
  `start_pressure` INT NULL,
  `end_pressure` INT NULL,
  `gas_type` VARCHAR(10) NULL,
  `SAC` DECIMAL(3,1) NULL, -- Calculated Value. SAC stands for Surface Air/Gas Consumption rate which is a normalized gas consumption rate
  `weight` INT NULL,
  `water_temperature` INT NULL,
  `visibility` INT NULL,
  `entry_details` VARCHAR(50) NULL,
  `condition_note` VARCHAR(100) NULL,
  `note` VARCHAR(2000) NULL,
  `site_rating` INT NULL,
  PRIMARY KEY (`dive_id`),
  INDEX `fk_Dives_Units_idx` (`unit_id` ASC) VISIBLE,
  CONSTRAINT `fk_Dives_has_Units`
    FOREIGN KEY (`unit_id`) 
    REFERENCES `Units` (`unit_id`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT)
ENGINE = InnoDB;

-- Create Divelogs intersection table

CREATE OR REPLACE TABLE Divelogs (
  `divelog_id` INT NOT NULL AUTO_INCREMENT,
  `dive_id` INT NOT NULL,
  `diver_id` INT NOT NULL,
  INDEX `fk_Dives_has_Divers_Divers1_idx` (`diver_id` ASC) VISIBLE,
  INDEX `fk_Dives_has_Divers_Dives1_idx` (`dive_id` ASC) VISIBLE,
  PRIMARY KEY (`divelog_id`),
  CONSTRAINT `fk_Dives_has_Divers_Dives1`
    FOREIGN KEY (`dive_id`)
    REFERENCES `Dives` (`dive_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Dives_has_Divers_Divers1`
    FOREIGN KEY (`diver_id`)
    REFERENCES `Divers` (`diver_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- Create DivesToDiveSites intersection table

CREATE OR REPLACE TABLE DivesToDiveSites (
  `dives_to_divesites_id` INT NOT NULL AUTO_INCREMENT,
  `dive_id` INT,
  `divesite_id` INT NOT NULL,
  PRIMARY KEY (`dives_to_divesites_id`),
  INDEX `fk_Dives_has_DiveSites_DiveSites1_idx` (`divesite_id` ASC) VISIBLE,
  INDEX `fk_Dives_has_DiveSites_Dives1_idx` (`dive_id` ASC) VISIBLE,
  CONSTRAINT `fk_Dives_has_DiveSites_Dives1`
    FOREIGN KEY (`dive_id`)
    REFERENCES `Dives` (`dive_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Dives_has_DiveSites_DiveSites1`
    FOREIGN KEY (`divesite_id`)
    REFERENCES `DiveSites` (`divesite_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- Insert Sample Data Into Divers
INSERT INTO Divers (first_name, last_name, diver_age)
values ('Jacques', 'Cousteau', 29), 
('Syliva', 'Earle', 87),
('Jerry', 'Garcia', 52),
('Greg', 'Louganis', 63), 
('Chris', 'Lutze', 29);

-- Insert sample data into DiveSites
INSERT INTO DiveSites (site_name, city, country)
values ('Golden Arches', 'Kona', 'United States'), 
('Casino Point', 'Catalina', 'United States'),
('Metridium Fields', 'Monterey', 'United States'),
('Texas', 'Roatan', 'Honduras'),
('Flame Reef', 'Santa Cruz Island', 'United States');

-- Insert sample data into Units
INSERT INTO Units (pressure_unit, length_unit, weight_unit, temperature_unit)
values ('psi', 'ft', 'lb', 'F'), -- Imperial units
('bar', 'm', 'kg', 'C'); -- Metric units

-- Insert sample data into Dives
INSERT INTO Dives (unit_id, date, max_depth, avg_depth, duration, start_pressure, end_pressure,
gas_type, SAC, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating)
VALUES (1, '2019-05-26', 62, NULL, 32, 3000, 1000, 'Air', NULL, 37, 55, 20, 'Boat', 'Mild surge',
'The sea floor was covered in brittle star and sea stars. We say a few schools of fish swimming through. Successfully managed to navigate in a half circle back to the boat anchor throughout the site. The kelp was so tall. We saw a bat ray towards the end of the dive cruising around 40 feet deep.',
3),
(1, '2021-01-16', 32, 24, 50, 3200, 1200, 'Air', ((start_pressure-end_pressure)/(duration*(avg_depth/33+1))), 18, 54, 10, 'Shore', 'Some swell on entry',
'Swam out along in kelp beds I saw some yellow nudibranches and some white nudibranchs, and a white small slug?. Saw a fair amount of decorator crabs, sea cucumbers, and rock fish, a sea lion, lots of brittle stars. I started to get cold towards the end of the dive but was not shivering.',
3),
(2, '1993-09-20', 60, 45, 52, 200, 50, 'EAN32', ((start_pressure-end_pressure)/(duration*(avg_depth/10+1))), 6, 25, 100, 'Boat', 'Strong drift current',
'This was a drift dive with fairly strong current. We descended to a reef wall and swam through some canyons for the first part of the dive and then entered the current. We followed the reef wall for most of the dive riding the current to the point of the island. I saw a very large rainbow parrot fish and 2 large barracudas. There were very large barrel sponges that I could have fit into. Texas itself was a Sandy patch with very large barrel sponges that looked a bit like tumbleweeds or saguaros. My favorite dive so far. Riding the current and going up and over reef patches was really fun.',
5);

-- Insert sample data into Divelogs
INSERT INTO Divelogs (dive_id, diver_id)
values (1, 1),
(2, 2),
(3, 3);

-- Insert sample data into DivesToDiveSites
INSERT INTO DivesToDiveSites (dive_id, divesite_id)
values (1, (select divesite_id from DiveSites where site_name = 'Flame Reef')),
(2, (select divesite_id from DiveSites where site_name = 'Metridium Fields')),
(3, 4);

SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
COMMIT;

