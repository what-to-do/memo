var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 8080;

//requireing our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//override POST when having ?_method=DELETE
app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

//Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


//register a Handlebars view engine
/*app.engine('handlebars', exphbs({defaultLayout: 'test'}));
app.set('view engine', 'handlebars');*/





//syncing our sequlize models and then starting our express app
db.sequelize.sync(/*{force: true}*/).then(function(){
	app.listen(PORT, function(){
	console.log("listenning on http://localhost:" + PORT);
});
});


