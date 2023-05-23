/*
    SETUP for a simple web app
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
        let query1 = "SELECT * FROM Divers;";

        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows})
        })
    });

// Add Diver Form
app.post('/addDiver', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    //query2 = `INSERT INTO Divers (diver_name, diver_age) VALUES ('${data.diver_name}', '${data.diver_age}');`;
    query2 = `INSERT INTO Divers (diver_name, diver_age) VALUES ('${data['insert_diver_name']}', '${data['insert_diver_age']}');`;
    db.pool.query(query2, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            /*// If no error, perform a SELECT * on divers
            query3 = `SELECT * FROM Divers;`;
            db.pool.query(query3, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })*/
            res.redirect('/');
        }
    })
    
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});