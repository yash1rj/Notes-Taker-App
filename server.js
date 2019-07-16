const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Configuring the database
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

// creating express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Pretify JSON response
app.set('json spaces', 2);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(() => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get("/", (req, res) => {
    res.json({
        "message": "Welcome to NotesTaker app. Take notes quickly. Organize and keep track of all your notes."
    });
});

// Setup server port
var port = process.env.PORT || 8080;

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(port, function () {
    console.log("Running notesTaker App on port " + port);
});