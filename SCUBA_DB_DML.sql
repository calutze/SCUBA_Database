-- Data Manipulation Queries for Super Cool Underwater Buddy App (SCUBA)
-- By Justin Ngo and Chris Lutze

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Divers Page Queries --------------------
-- select all data in Divers table
SELECT * FROM Divers;

-- insert new diver into Divers table
INSERT INTO Divers (diver_name, diver_age)
values (:diverNameInput, :ageInput);

-- update diver in Divers table
UPDATE Divers
SET diver_name = :diverNameInput, diverge = :ageInput
WHERE diver_id = :selectedDiverId

-- delete selected diver from Divers page in Divers table
DELETE FROM Divers where diver_id = :selectedDiverId


-- Units Page Queries -------------------
-- select all data from Units table
SELECT * FROM Units;

-- insert new unit into Units table
INSERT INTO Units (pressure_unit, length_unit, weight_unit, temperature_unit)
VALUES (:pressureInput, :lengthInput, :weightUnitInput, :temperatureInput)

-- update unit in Units table
UPDATE Units
SET pressure_unit = :pressureInput, length_unit = :lengthInput, weight_unit = :weightInput, temperature_unit = :temperatureInput
WHERE unit_id = :selectedUnitId


-- Dives Page Queries -------------------------
-- show all data from Dives table
SELECT * FROM Dives;

-- insert new dive entry into Dives table
INSERT INTO Dives (duration, max_depth, avg_depth, start_pressure, end_pressure, weight, water_temperature, visibility, note, date, SAC, gas_type, entry_details, site_rating)
values (:durationInput, :max_depthInput, :avg_depthInput, :start_pressureInput, :end_pressureInput, :weightInput, :water_tempInput, :visibilityInput, :noteInput, :dateInput, 
:SACInput, :gas_typeInput, :detailsInput, :ratingInput);

DELETE FROM Dives WHERE dive_id = :selectedDiveId


-- Dive Sites Page Queries ------------------
-- show all data from DiveSites table
SELECT * from DiveSites;

-- insert new location into DiveSites table
INSERT INTO DiveSites (site_name, city, country)
values (:siteInput, :cityInput, :countryInput);

DELETE FROM DiveSites WHERE divesite_id = :selectedDiveSiteId


-- Dive Logs Page Queries -------------------------
-- show all data from DiveLogs table
SELECT * from DiveLogs;

-- insert new intersection between Dives and Divers
INSERT INTO DiveLogs (dive_id, diver_id)
values (:diveIdInput, :diverIdInput)

DELETE FROM DiveLogs WHERE divelog_id = :selectedDiveLogId


-- Dives-to-Dive Sites Page Queries --------------------
-- show all data from DivesToDiveSites table
SELECT * from DivesToDiveSites;

-- insert new intersection between Dives and DiveSites
INSERT INTO DivesToDiveSites (dive_id, divesite_id)
values (:diveIdInput, :diveSiteIdInput)

DELETE FROM DivesToDiveSites WHERE dives_to_divesites_id = :selectedDivesToDiveSitesId

SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
COMMIT;

