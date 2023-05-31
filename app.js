/*
    SETUP for a simple web app
    Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 12315;                 // Set a port number at the top so it's easy to change in the future

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

app.get('/units', function(req, res) {
    let query1 = "SELECT * FROM Units;";

    db.pool.query(query1, function(error, rows, fields){
        res.render('units', {data: rows})
    })
});

app.get('/dives', function(req, res) {
    let querySelectDives = "SELECT * FROM Dives_View;";

    db.pool.query(querySelectDives, function(error, rows, fields){
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
                rows[i].gas_type = "N/A"
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
        res.render('dives', {data: rows})
    })
});



app.get('/divesites', function(req, res) {
    res.render('divesites')
});

app.get('/divelogs', function(req, res) {
    res.render('divelogs')
});

app.get('/divestodivesites', function(req, res) {
    res.render('divestodivesites')
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});