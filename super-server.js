/**
 * Created by Yonatan.Vainer on 7/9/2015.
 */

// modules
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var busboy          = require('connect-busboy');
var mongoose        = require('mongoose');

// configuration

// config files
var db              = require('./config/db');
// set up port
var port            = process.env.PORT || 3000;

mongoose.connect(db.url);

// express settings

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(busboy({immediate: true}));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes')(app);

app.listen(port);
console.log('Yo! listening on port '+port);
