-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET AUTOCOMMIT = 0;

-- select all data in Divers table
SELECT * FROM Divers;

-- insert new diver into Divers table
INSERT INTO Divers (first_name, last_name, diver_age)
values (:fnameInput, :lnameInput, :ageInput);

-- insert new location into DiveSites table
INSERT INTO DiveSites (site_name, city, country)
values (:siteInput, :cityInput, :countryInput);

-- insert new gear into Gear table
INSERT INTO Gear (exposure_suit, boots, gloves, hood, fins, bcd, regulator, diver_id)
values (:suitInput, :bootsInput, :glovesInput, :hoodInput, :finsInput, :bcdInput, :regulatorInput, :diverId);

-- insert new dive entry into Dives table
INSERT INTO Dives (duration, max_depth, avg_depth, start_pressure, end_pressure, weight, water_temperature, visibility, note, date, SAC, gas_type, entry_details, site_rating)
values (:durationInput, :max_depthInput, :avg_depthInput, :start_pressureInput, :end_pressureInput, :weightInput, :water_tempInput, :visibilityInput, :noteInput, :dateInput, 
:SACInput, :gas_typeInput, :detailsInput, :ratingInput);

-- delete selected diver from Divers page in Divers table
DELETE FROM Divers where diver_id = :diver_id_from_divers_page


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
COMMIT;

