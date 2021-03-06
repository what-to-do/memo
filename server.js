var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 8080;

//requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public/assets"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// Static directory
//app.use('/static', express.static("/public"));

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var authConfig = require('./oauth/oauth');

//nodemailer('ellioy37@gmail.com', 'From Server', 'test message');

//Passport
// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// config for passport facebook login
passport.use(new FacebookStrategy({
        clientID: authConfig.facebook.clientID,
        clientSecret: authConfig.facebook.clientSecret,
        callbackURL: authConfig.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        db.Users.findOrCreate({
                where: {
                    oauthId: profile.id
                },
                defaults: {
                    name: profile.displayName
                }
            })
            .then(function(user, created) {
                /*console.log(currentUser);*/

                //null is where err should be
                return done(null, user);
            });
    }
));


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (need for auth)
app.use(bodyParser()); // get information from html forms

app.use(session({
    secret: 'secretwordhere'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in sessions

//Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/passport-routes.js")(app, passport);


//syncing our sequelize models then starting our express app.  
//Use force:true after models have been altered or first running the app on a local machine
db.sequelize.sync(/*{force: true}*/ ).then(function() {
    app.listen(PORT, function() {
        console.log("listening on http://localhost:" + PORT);
    });
});