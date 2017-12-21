/**================================================================ 
            History Of The File 
    Author          - Vatsaly Patel 
    purpose         - Writing - Entry point of server file
==================================================================== **/
let express  = require('express');
const app      = express();
let mongoose = require('mongoose');
let passport = require('passport');
let bodyParser   = require('body-parser');
let session      = require('express-session');

global.__parentDir = __dirname;

const configDB = require('./config/database.js');

const ENV = require('./config/environment.js');
const config = require('./config/config-'+ENV.env+'.json');
const port     = process.env.PORT || config.PORT;
const hostIp     = config.HOST_IP || "0.0.0.0";

configDB.connectMongoDB(); // connect to our database

// require(__parentDir+'/config/passport'); // pass passport for configuration

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json({limit: '500:mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

//static public folder
app.use(express.static('public'))

// required for passport
app.use(session(
	{ 
		secret: 'vatsaly_patel',
	    resave: true,
	    saveUninitialized: true
	}
)); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch
app.listen(port, hostIp);
console.log('The magic happens on port ' + port);