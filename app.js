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
        res.render('divers', {data: rows})
    })
});

app.get('/units', function(req, res) {
    let query1 = "SELECT * FROM Units;";

    db.pool.query(query1, function(error, rows, fields){
        res.render('units', {data: rows})
    })
});

app.get('/dives', function(req, res) {
    res.render('dives')
    res.render('dives')
});

app.get('/divesites', function(req, res) {
    res.render('divesites')
    res.render('divesites')
});

app.get('/divelogs', function(req, res) {
    res.render('divelogs')
});

app.get('/divestodivesites', function(req, res) {
    res.render('divestodivesites')
});

// Add Diver Form
app.post('/addDiver', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    /*let avg_SAC = parseInt(data.avg_SAC);
    if (isNaN(avg_SAC))
    {
        avg_SAC = 'N/A'
    }

    let num_dives = parseInt(data.num_dives);
    if (isNaN(num_dives))
    {
        num_dives = 0
    }

    let total_dive_time = parseInt(data.total_dive_time);
    if (isNaN(total_dive_time))
    {
        total_dive_time = 0
    }*/

    // Create the query and run it on the database
    query1 = `INSERT INTO Divers (diver_name, diver_age) VALUES ('${data.diver_name}', ${data.diver_age})`;
    //query2 = `INSERT INTO Divers (diver_name, diver_age) VALUES ('${data['insert_diver_name']}', '${data['insert_diver_age']}');`;
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
            query2 = `SELECT * FROM Divers;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
            //res.redirect('/');
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
    
    //let diver_name = parseInt(data.diver_name);
    //let diver_age = parseInt(data.diver_age);

    let queryUpdateDiver = 'UPDATE Divers SET diver_age = ? WHERE diver_id = ?';
    let selectDiver = 'SELECT * FROM Divers WHERE diver_id = ?'

    db.pool.query(queryUpdateDiver, [`${data.diver_age}`, data.diver_id], function(error, rows, fields){
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