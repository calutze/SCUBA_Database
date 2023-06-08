/*
    SETUP for a simple web app
    Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 12317;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// app.js Setup Section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index')
    });

app.get('/divers', function(req, res) {
    let query1 = "SELECT * FROM Divers_View;";

    db.pool.query(query1, function(error, rows, fields){
        for (let i=0; i < rows.length; i++) {
        // Capture NULL values
            let avg_SAC = parseInt(rows[i].avg_SAC);
            if (isNaN(avg_SAC))
            {
                rows[i].avg_SAC = "N/A"
            }

            let num_dives = parseInt(rows[i].num_dives);
            if (isNaN(num_dives))
            {
                rows[i].num_dives = 0
            }

            let total_dive_time = parseInt(rows[i].total_dive_time);
            if (isNaN(total_dive_time))
            {
                rows[i].total_dive_time = 0
            }
        }
        res.render('divers', {data: rows})
    })
});

// Add Diver Form
app.post('/addDiver', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Divers (diver_name, diver_age) VALUES ('${data.diver_name}', ${data.diver_age})`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT * on divers
            query2 = `SELECT * FROM Divers_View;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
    
});

// Delete Diver Route
app.delete('/delete-diver/', function(req,res,next){
    let data = req.body;
    let diverID = parseInt(data.diver_id);
    let deleteDivers = 'DELETE FROM Divers WHERE diver_id = ?';

    db.pool.query(deleteDivers, [diverID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


// Update Diver Form
app.put('/updateDiver', function(req, res, next){
    let data = req.body;
    console.log('Update Diver Data Received:', data);

    let queryUpdateDiver = 'UPDATE Divers SET diver_name = ?, diver_age = ? WHERE diver_id = ?';
    let selectDiver = 'SELECT * FROM Divers WHERE diver_id = ?'

    db.pool.query(queryUpdateDiver, [data.diver_name, data.diver_age, data.diver_id], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                db.pool.query(selectDiver, [data.diver_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        console.log('Updated Diver Data:', rows)
                        res.send(rows);
                    }
                })
            }
        })
});


app.get('/dives', function(req, res) {
    let querySelectDives = "SELECT dive_id, unit_name as units, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating FROM Dives_View JOIN Units on Dives_View.unit_id = Units.unit_id;";
    let querySelectUnits = "SELECT * FROM Units;";

    db.pool.query(querySelectDives, function(error, rows, fields){
        if (error) {
            console.log(error)
            return;
        }
        for (let i=0; i < rows.length; i++) {
            // Capture NULL values
            let avg_depth = parseInt(rows[i].avg_depth);
            if (isNaN(avg_depth))
            {
                rows[i].avg_depth = "N/A"
            }
            let start_pressure = parseInt(rows[i].start_pressure);
            if (isNaN(start_pressure))
            {
                rows[i].start_pressure = "N/A"
            }
            let end_pressure = parseInt(rows[i].end_pressure);
            if (isNaN(end_pressure))
            {
                rows[i].end_pressure = "N/A"
            }
            let gas_type = parseInt(rows[i].gas_type);
            if (isNaN(gas_type))
            {
                rows[i].gas_type = "Air"
            }
            let weight = parseInt(rows[i].weight);
            if (isNaN(weight))
            {
                rows[i].weight = "N/A"
            }
            let water_temperature = parseInt(rows[i].water_temperature);
            if (isNaN(water_temperature))
            {
                rows[i].water_temperature = "N/A"
            }
            let visibility = parseInt(rows[i].visibility);
            if (isNaN(visibility))
            {
                rows[i].visibility = "N/A"
            }
            let SAC = parseInt(rows[i].SAC);
            if (isNaN(SAC))
            {
                rows[i].SAC = "N/A"
            }
            let oldDate = rows[i].date;
            let newDate = new Date(oldDate);
            //let new2 = newDate.split('T')[0];
            console.log(newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate());
        }
        db.pool.query(querySelectUnits, function (error, Units, fields) {
            if (error) {
                console.log(error)
                return;
            }
            res.render('dives', {data: rows, unitsData: Units})
        })
        
    })
});

// Add Dive Form
app.post('/addDive', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Dives (unit_id, date, max_depth, avg_depth, duration, start_pressure, end_pressure, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating) VALUES (${data.unit_id}, '${data.date}', ${data.max_depth}, ${data.avg_depth}, ${data.duration}, ${data.start_pressure}, ${data.end_pressure}, '${data.gas_type}', ${data.weight}, ${data.water_temperature}, ${data.visibility}, '${data.entry_details}', '${data.condition_note}', '${data.note}', ${data.site_rating});`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT * on divers
            querySelectDives = "SELECT dive_id, unit_name as units, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating FROM Dives_View JOIN Units on Dives_View.unit_id = Units.unit_id;";
            db.pool.query(querySelectDives, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    for (let i=0; i < rows.length; i++) {
                        // Capture NULL values
                        let avg_depth = parseInt(rows[i].avg_depth);
                        if (isNaN(avg_depth))
                        {
                            rows[i].avg_depth = "N/A"
                        }
                        let start_pressure = parseInt(rows[i].start_pressure);
                        if (isNaN(start_pressure))
                        {
                            rows[i].start_pressure = "N/A"
                        }
                        let end_pressure = parseInt(rows[i].end_pressure);
                        if (isNaN(end_pressure))
                        {
                            rows[i].end_pressure = "N/A"
                        }
                        let gas_type = parseInt(rows[i].gas_type);
                        if (isNaN(gas_type))
                        {
                            rows[i].gas_type = "Air"
                        }
                        let weight = parseInt(rows[i].weight);
                        if (isNaN(weight))
                        {
                            rows[i].weight = "N/A"
                        }
                        let water_temperature = parseInt(rows[i].water_temperature);
                        if (isNaN(water_temperature))
                        {
                            rows[i].water_temperature = "N/A"
                        }
                        let visibility = parseInt(rows[i].visibility);
                        if (isNaN(visibility))
                        {
                            rows[i].visibility = "N/A"
                        }
                        let SAC = parseInt(rows[i].SAC);
                        if (isNaN(SAC))
                        {
                            rows[i].SAC = "N/A"
                        }
                    }
                    res.send(rows);
                }
            })
        }
    })
    
});

// Update Dive Form
app.put('/updateDive', function(req, res, next){
    let data = req.body;
    console.log('Update Dive Data Received:', data);

    let queryUpdateDive = 'UPDATE Dives SET unit_id = ?, date = ?, max_depth = ?, avg_depth = ?, duration = ?, start_pressure = ?, end_pressure = ?, gas_type = ?, weight = ?, water_temperature = ?, visibility = ?, entry_details = ?, condition_note = ?, note = ?, site_rating = ? WHERE dive_id = ?';
    let selectDive = querySelectDives = "SELECT dive_id, unit_name as units, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, avg_depth, duration, start_pressure, end_pressure, SAC, gas_type, weight, water_temperature, visibility, entry_details, condition_note, note, site_rating FROM Dives_View JOIN Units on Dives_View.unit_id = Units.unit_id WHERE Dives_View.dive_id = ?;";

    db.pool.query(queryUpdateDive, [data.unit_id, data.date, data.max_depth, data.avg_depth, data.duration, data.start_pressure, data.end_pressure, data.gas_type, data.weight, data.water_temperature, data.visibility, data.entry_details, data.condition_note, data.note, data.site_rating, data.dive_id], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                db.pool.query(selectDive, [data.dive_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        console.log('Updated Dive Data:', rows)
                        res.send(rows);
                    }
                })
            }
        })
});

// Delete Dive Route
app.delete('/delete-dive/', function(req,res,next){
    let data = req.body;
    let diveID = parseInt(data.dive_id);
    let deleteDive = 'DELETE FROM Dives WHERE dive_id = ?';

    db.pool.query(deleteDive, [diveID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


// Display Divelogs Route
app.get('/divelogs', function(req, res) {
    let queryDivelogs = "SELECT divelog_id, Divelogs.dive_id, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, duration, Divers.diver_id, diver_name FROM Divelogs JOIN Divers ON Divelogs.diver_id = Divers.diver_id JOIN Dives ON Divelogs.dive_id = Dives.dive_id ORDER BY divelog_id;";

    db.pool.query(queryDivelogs, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('divelogs', {data: rows})
        }
    });
});

// Add Divelog Form
app.post('/addDivelog', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Divelogs (dive_id, diver_id) VALUES (${data.dive_id}, ${data.diver_id});`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT on Divelogs
            querySelectDivelogs = "SELECT divelog_id, Divelogs.dive_id, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, duration, Divers.dive_id, diver_name FROM Divelogs JOIN Divers ON Divelogs.diver_id = Divers.diver_id JOIN Dives ON Divelogs.dive_id = Dives.dive_id ORDER BY divelog_id;";
            db.pool.query(querySelectDivelogs, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
    
});

// Delete Dive Route
app.delete('/delete-divelog/', function(req,res,next){
    let data = req.body;
    let divelogID = parseInt(data.divelog_id);
    let deleteDive = 'DELETE FROM Divelogs WHERE divelog_id = ?';

    db.pool.query(deleteDive, [divelogID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


app.get('/units', function(req, res) {
    let query1 = "SELECT * FROM Units;";

    db.pool.query(query1, function(error, rows, fields){
        res.render('units', {data: rows})
    })
});

// Add Unit Form
app.post('/addUnit', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Units (unit_name, pressure_unit, length_unit, weight_unit, temperature_unit) VALUES ('${data.unit_name}', '${data.pressure_unit}', '${data.length_unit}', '${data.weight_unit}', '${data.temperature_unit}');`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT * on divers
            querySelectUnits = "SELECT * FROM Units";
            db.pool.query(querySelectUnits, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
    
});

// Delete Unit Route
app.delete('/delete-unit/', function(req,res,next){
    let data = req.body;
    let unitID = parseInt(data.unit_id);
    let deleteUnit = 'DELETE FROM Units WHERE unit_id = ?';

    db.pool.query(deleteUnit, [unitID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Update Units Form
app.put('/updateUnit', function(req, res, next){
    let data = req.body;
    console.log('Update Unit Data Received:', data);

    let queryUpdateUnit = 'UPDATE Units SET unit_name = ?, pressure_unit = ?, length_unit = ?, weight_unit = ?, temperature_unit = ? WHERE unit_id = ?';
    let selectUnit = 'SELECT * FROM Units WHERE unit_id = ?'

    db.pool.query(queryUpdateUnit, [data.unit_name, data.pressure_unit, data.length_unit, data.weight_unit, data.temperature_unit, data.unit_id], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                db.pool.query(selectUnit, [data.unit_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        console.log('Updated Unit Data:', rows)
                        res.send(rows);
                    }
                })
            }
        })
});


app.get('/divesites', function(req, res) {
    let query1 = "SELECT * FROM DiveSites";

    db.pool.query(query1, function(error, rows, fields){
        res.render('divesites', {data: rows})
    })
});

// Add Dive Sites Form
app.post('/addDiveSite', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO DiveSites (site_name, city, country) VALUES ('${data.site_name}', '${data.city}', '${data.country}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT * on divers
            query2 = `SELECT * FROM DiveSites;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
    
});

// Delete DiveSite Route
app.delete('/delete-divesite/', function(req,res,next){
    let data = req.body;
    let divesiteID = parseInt(data.divesite_id);
    let deleteDiveSite = 'DELETE FROM DiveSites WHERE divesite_id = ?';

    db.pool.query(deleteDiveSite, [divesiteID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Update DiveSite Form
app.put('/updateDiveSite', function(req, res, next){
    let data = req.body;
    console.log('Update Dive Site Data Received:', data);

    let queryUpdateDiveSite = 'UPDATE DiveSites SET site_name = ?, city = ?, country = ? WHERE divesite_id = ?';
    let selectDiveSite = 'SELECT * FROM DiveSites WHERE divesite_id = ?'

    db.pool.query(queryUpdateDiveSite, [data.site_name, data.city, data.country, data.divesite_id], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                db.pool.query(selectDiveSite, [data.divesite_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        console.log('Updated Dive Site Data:', rows)
                        res.send(rows);
                    }
                })
            }
        })
});


app.get('/divestodivesites', function(req, res) {
    let queryDivesToDiveSites = "SELECT dives_to_divesites_id, DivesToDiveSites.dive_id, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, duration, DiveSites.divesite_id, site_name FROM DivesToDiveSites JOIN DiveSites ON DivesToDiveSites.divesite_id = DiveSites.divesite_id JOIN Dives ON DivesToDiveSites.dive_id = Dives.dive_id ORDER BY dives_to_divesites_id;";

    db.pool.query(queryDivesToDiveSites, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('divestodivesites', {data: rows})
        }
    });
});

// Add DiveToDiveSites Form
app.post('/addDiveToDiveSites', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO DiveToDiveSites (dive_id, divesite_id) VALUES (${data.dive_id}, ${data.divesite_id});`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If no error, perform a SELECT on Divelogs
            querySelectDiveToDiveSites = "SELECT dive_to_divesites_id, DiveToDiveSites.dive_id, DATE_FORMAT(date, '%d-%m-%Y') as date, max_depth, duration, DiveSites.divesite_id, site_name FROM DiveToDiveSites JOIN DiveSites ON DiveToDiveSites.divesite_id = DiveSites.divesite_id JOIN Dives ON DiveToDiveSites.dive_id = Dives.dive_id ORDER BY dive_to_divesites_id;";
            db.pool.query(querySelectDiveToDiveSites, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
    
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});