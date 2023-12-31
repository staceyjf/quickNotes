const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// var methodOverride = require('method-override'); // mounting this to be able to delete

// always require and configure near the top
require('dotenv').config()

//connect to the db
require('./config/database')
   
const app = express();
app.use(logger('dev'));
app.use(express.json());
// app.use(methodOverride('_method')); // overwrite middleware

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// middleware to check and verify a JWT 
// and assign a user object to req.body
app.use(require('./config/checkToken'));

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

// we need to put the API routes here before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/notes', require('./routes/api/notes'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
    // sending the production ready in our build folder - index.html file 
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
console.log(`Express app running on port ${port}`)
});
