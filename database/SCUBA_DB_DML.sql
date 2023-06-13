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
values (:inputDiverName, :inputDiverAge);

-- Show existing values in update diver area
SELECT diver_name, diver_age FROM Divers WHERE diver_id = :selectedDiverId

-- update diver in Divers table
UPDATE Divers
SET diver_name = :updatedDiverName, diver_age = :selectDiverAge
WHERE diver_id = :selectDiverId

-- select specific updated diver for AJAX updating
SELECT * FROM Divers WHERE diver_id = :selectDiverId

-- delete selected diver from Divers table
DELETE FROM Divers where diver_id = :selectDiverId


-- Units Page Queries -------------------
-- select all data from Units table
SELECT * FROM Units;

-- insert new unit into Units table
INSERT INTO Units (pressure_unit, length_unit, weight_unit, temperature_unit)
VALUES (:inputPressureUnit, :inputLengthUnit, :inputWeightUnit, :inputTemperatureUnit)

-- Show existing values in update unit area
SELECT pressure_unit, length_unit, weight_unit, temeprature_unit FROM Units WHERE unit_id = :selectedUnitId

-- update unit in Units table
UPDATE Units
SET pressure_unit = :updatePressureUnit, length_unit = :updateLengthUnit, weight_unit = :updateWeightUnit, temperature_unit = :updateTemperatureUnit
WHERE unit_id = :selectedUnitId


-- Dives Page Queries -------------------------
-- show all data from Dives table
SELECT dive_id, unit_name as units, date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating 
FROM Dives_View 
JOIN Units on Dives_View.unit_id = Units.unit_id;

-- insert new dive entry into Dives table
INSERT INTO Dives (unit_id, date, max_depth, avg_depth, duration, start_pressure, end_pressure, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating) 
VALUES (:inputUnits, :inputDate, :inputMaxDepth, :inputAvgDepth, :inputDuration, :inputStartPressure, :inputEndPressure, :inputGasType, :inputWeight, :inputWaterTemp, :inputVisibility, :inputEntryDetails, :inputConditionNote, :inputNote, :inputSiteRating)

-- show existing values in update dives area
SELECT dive_id, unit_name as units, date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating 
FROM Dives_View 
JOIN Units on Dives_View.unit_id = Units.unit_id 
WHERE Dives_View.dive_id = :selectedDiveId

-- update dives in Dives table
UPDATE Dives 
SET unit_id = :updateUnits, date = :updateDate, max_depth = :updateMaxDepth, avg_depth = :updateAvgDepth, duration = :updateDuration, start_pressure = :updateStartPressure, end_pressure = :updateEndPressure, gas_type = :updateGasType, weight = :updateWeight, water_temperature = :updateWaterTemp, visibility = :updateVisibility, entry_details = :updateEntryDetails, condition_note = :updateConditionNote, note = :updateNote, site_rating = :updateSiteRating 
WHERE dive_id = :updateDiveId

-- delete selected dive from Dives table
DELETE FROM Dives WHERE dive_id = :selectedDiveId


-- Dive Sites Page Queries ------------------
-- show all data from DiveSites table
SELECT * from DiveSites;

-- insert new location into DiveSites table
INSERT INTO DiveSites (site_name, city, country)
values (:inputSiteName, :inputCity, :inputCountry);

-- show existing values in update dive sites area
SELECT site_name, city, country FROM DiveSites WHERE divesite_id = :selectedDiveSiteId

-- update dive site in Dive Sites table
UPDATE DiveSites
SET site_name = :updateSiteName, city = :updateCity, country = :updateCountry WHERE divesite_id = selectedDiveSiteId

-- delete selected dive site from DiveSites table
DELETE FROM DiveSites WHERE divesite_id = :selectedDiveSiteId


-- Dive Logs Page Queries -------------------------
-- show all data from DiveLogs table
SELECT divelog_id, Divelogs.dive_id, DATE_FORMAT(date, '%d-%M-%Y') as date, max_depth, duration, Divers.diver_id, diver_name 
FROM Divelogs 
LEFT JOIN Divers ON Divelogs.diver_id = Divers.diver_id 
JOIN Dives ON Divelogs.dive_id = Dives.dive_id 
ORDER BY divelog_id;

-- insert new intersection between Dives and Divers
INSERT INTO DiveLogs (dive_id, diver_id)
values (:inputDive, :inputDiver)

-- show existing values in update dive logs area
SELECT divelog_id, Divelogs.dive_id, date, max_depth, duration, Divers.dive_id, diver_name 
FROM Divelogs 
JOIN Divers ON Divelogs.diver_id = Divers.diver_id 
JOIN Dives ON Divelogs.dive_id = Dives.dive_id 
WHERE Dives_View.dive_id = :updateDivelogId
ORDER BY divelog_id;

-- update dive log in dive logs table
UPDATE DiveLogs
SET dive_id = :updatedDiveId, diver_id = :updatedDiverId WHERE divelog_id = selectDivelogId

DELETE FROM DiveLogs WHERE divelog_id = :selectDivelogId


-- Dives-to-Dive Sites Page Queries --------------------
-- show all data from DivesToDiveSites table
SELECT dives_to_divesites_id, DivesToDiveSites.dive_id, DATE_FORMAT(date, '%d-%M-%Y') as date, max_depth, duration, DiveSites.divesite_id, site_name 
FROM DivesToDiveSites 
JOIN DiveSites ON DivesToDiveSites.divesite_id = DiveSites.divesite_id 
JOIN Dives ON DivesToDiveSites.dive_id = Dives.dive_id 
ORDER BY dives_to_divesites_id;

-- insert new intersection between Dives and DiveSites
INSERT INTO DivesToDiveSites (dive_id, divesite_id)
values (:inputDive, :inputSite)

-- show existing values in update dives to dive sites area
SELECT dive_id, divesite_id FROM DivesToDiveSites WHERE dives_to_divesites_id = selectDivesToDiveSitesId

-- update dives to dive sites table
UPDATE DivesToDiveSites
SET dive_id = :updatedDiveId, divesite_id = :updatedSiteId WHERE dives_to_divesites_id = selectDivesToDiveSitesId

-- delete selected dives to dive site from DiveToDiveSites table
DELETE FROM DivesToDiveSites WHERE dives_to_divesites_id = :selectDivesToDiveSitesId

