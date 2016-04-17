var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose      = require('mongoose');
var connectionStringFormMaker = 'mongodb://localhost/FormMakerDB';
var connectionStringNextReadHunt = 'mongodb://localhost/NextReadHuntDB';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionStringFormMaker = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;

    connectionStringNextReadHunt = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        'NextReadHunt';
}

var dbFormMaker = mongoose.createConnection(connectionStringFormMaker);
var dbNextReadHunt = mongoose.createConnection(connectionStringNextReadHunt);

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

//require('env2')('config.env');
//console.log(process.env);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, dbFormMaker, mongoose);
require("./public/project/server/app.js")(app, dbNextReadHunt, mongoose);
app.listen(port, ipaddress);