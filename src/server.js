const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const initRoutes = require('./routes');
const config = require('../config');
const db = require('./startup/db');
const passport = require('passport');
require('../config/passport')(passport);

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.get('/index2', function(req,res){
   res.sendFile(path.join(__dirname, '../public', 'index2.html'));
});


app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json()); 


initRoutes( app, passport );

// connect database.
db.connect().then(() => {
  server.listen(config.app.port || 5000);
  console.log('Connected to database!');
  console.log('Server is listening to port: ' + config.app.port || 5000);
});
module.exports = server;

