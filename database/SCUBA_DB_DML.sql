-- Data Manipulation Queries for Super Cool Underwater Buddy App (SCUBA)
-- By Justin Ngo and Chris Lutze

-- Populate ID Numbers --------------------
-- get all diver IDs
SELECT diver_id FROM Divers;

-- get all unit IDs
SELECT unit_id FROM Units;

-- get all dive IDs
SELECT dive_id FROM Dives;

-- get all dive site IDs

SELECT divsite_id FROM DiveSites;

-- get all divelog IDs

SELECT divelog_id FROM DiveLogs;

-- get all dive to dive site IDs
SELECT dives_to_divesites_id FROM DivesToDiveSites;


-- Divers Page Queries --------------------
-- select all data from Divers_View table
SELECT * FROM Divers_View;

-- insert new diver into Divers table
INSERT INTO Divers (diver_name, diver_age)
values (:diverNameInput, :ageInput);

-- Show existing values in update diver area
SELECT diver_name, diver_age FROM Divers WHERE diver_id = :selectedDiverId

-- update diver in Divers table
UPDATE Divers
SET diver_name = :diverNameInput, diver_age = :ageInput
WHERE diver_id = :selectedDiverId

-- select specific updated diver for AJAX updating
SELECT * FROM Divers WHERE diver_id = :updatedDiverId

-- delete selected diver from Divers table
DELETE FROM Divers where diver_id = :selectedDiverId


-- Units Page Queries -------------------
-- select all data from Units table
SELECT * FROM Units;

-- insert new unit into Units table
INSERT INTO Units (pressure_unit, length_unit, weight_unit, temperature_unit)
VALUES (:pressureInput, :lengthInput, :weightUnitInput, :temperatureInput)

-- Show existing values in update unit area
SELECT pressure_unit, length_unit, weight_unit, temeprature_unit FROM Units WHERE unit_id = :selectedUnitId

-- update unit in Units table
UPDATE Units
SET pressure_unit = :pressureInput, length_unit = :lengthInput, weight_unit = :weightInput, temperature_unit = :temperatureInput
WHERE unit_id = :selectedUnitId


-- Dives Page Queries -------------------------
-- show all data from Dives table
SELECT dive_id, unit_name as units, date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating 
FROM Dives_View 
JOIN Units on Dives_View.unit_id = Units.unit_id;

-- insert new dive entry into Dives table
INSERT INTO Dives (unit_id, date, max_depth, avg_depth, duration, start_pressure, end_pressure, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating) 
VALUES (:unit_idInput, :dateInput, :max_depthInput, :avg_depthInput, :durationInput, :start_pressureInput, :end_pressureInput, :gas_typeInput, :weightInput, :water_temperatureInput, :visibilityInput, :entry_detailsInput, :condition_noteInput, :noteInput, :site_ratingInput)

-- show existing values in update dives area
SELECT dive_id, unit_name as units, date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating 
FROM Dives_View 
JOIN Units on Dives_View.unit_id = Units.unit_id 
WHERE Dives_View.dive_id = :selectedDiveId

-- update dives in Dives table
UPDATE Dives 
SET unit_id = :unit_idInput, date = :dateInput, max_depth = :max_depthInput, avg_depth = :avg_depthInput, duration = :durationInput, start_pressure = :start_pressureInput, end_pressure = :end_pressureInput, gas_type = :gas_typeInput, weight = :weightInput, water_temperature = ?, visibility = ?, entry_details = ?, condition_note = ?, note = ?, site_rating = ? 
WHERE dive_id = :updateDiveId

-- delete selected dive from Dives table
DELETE FROM Dives WHERE dive_id = :selectedDiveId


-- Dive Sites Page Queries ------------------
-- show all data from DiveSites table
SELECT * from DiveSites;

-- insert new location into DiveSites table
INSERT INTO DiveSites (site_name, city, country)
values (:siteInput, :cityInput, :countryInput);

-- show existing values in update dive sites area
SELECT site_name, city, country FROM DiveSites WHERE divesite_id = :selectedDiveSiteId

-- update dive site in Dive Sites table
UPDATE DiveSites
SET site_name = :siteInput, city = :cityInput, country = :countryInput WHERE divesite_id = selectedDiveSiteId

-- delete selected dive site from DiveSites table
DELETE FROM DiveSites WHERE divesite_id = :selectedDiveSiteId


-- Dive Logs Page Queries -------------------------
-- show all data from DiveLogs table
SELECT divelog_id, Divelogs.dive_id, date, max_depth, duration, Divers.dive_id, diver_name 
FROM Divelogs 
JOIN Divers ON Divelogs.diver_id = Divers.diver_id 
JOIN Dives ON Divelogs.dive_id = Dives.dive_id 
ORDER BY divelog_id;

-- insert new intersection between Dives and Divers
INSERT INTO DiveLogs (dive_id, diver_id)
values (:diveIdInput, :diverIdInput)

-- show existing values in update dive logs area
SELECT divelog_id, Divelogs.dive_id, date, max_depth, duration, Divers.dive_id, diver_name 
FROM Divelogs 
JOIN Divers ON Divelogs.diver_id = Divers.diver_id 
JOIN Dives ON Divelogs.dive_id = Dives.dive_id 
WHERE Dives_View.dive_id = :updateDivelogId
ORDER BY divelog_id;

-- update dive log in dive logs table
UPDATE DiveLogs
SET dive_id = :diveIdInput, diver_id = :diverIdInput WHERE divelog_id = selectedDiveLogId

DELETE FROM DiveLogs WHERE divelog_id = :selectedDiveLogId


-- Dives-to-Dive Sites Page Queries --------------------
-- show all data from DivesToDiveSites table
SELECT * from DivesToDiveSites;

-- insert new intersection between Dives and DiveSites
INSERT INTO DivesToDiveSites (dive_id, divesite_id)
values (:diveIdInput, :diveSiteIdInput)

-- show existing values in update dives to dive sites area
SELECT dive_id, divesite_id FROM DivesToDiveSites WHERE dives_to_divesites_id = selectedDivesToDiveSitesId

-- update dives to dive sites table
UPDATE DivesToDiveSites
SET dive_id = :diveIdInput, divesite_id = :divesiteIdInput WHERE dives_to_divesites_id = selectedDivesToDiveSitesId

-- delete selected dives to dive site from DiveToDiveSites table
DELETE FROM DivesToDiveSites WHERE dives_to_divesites_id = :selectedDivesToDiveSitesId

