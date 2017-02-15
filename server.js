var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 8080;

//requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public/assets"));

//override POST when having ?_method=DELETE
app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
//app.use('/static', express.static("/public"));

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');



//Passport
//require("./passport.js");

//require('./passport')(passport);	// pass passport for configuration
//register a Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(morgan('dev'));		// log every request to the console
app.use(cookieParser());	// read cookies (need for auth)
app.use(bodyParser());		// get information from html forms

app.use(session({ secret: 'secretwordhere' }));
app.use(passport.initialize());
app.use(passport.session());	// persistent login sessions
app.use(flash());	// use connect-flash for flash messages stored in sessions

//Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/passport-routes.js")(app, passport);


//syncing our sequlize models and then starting our express app
db.sequelize.sync(/*{force: true}*/).then(function(){
	app.listen(PORT, function(){
	console.log("listening on http://localhost:" + PORT);
});
});


