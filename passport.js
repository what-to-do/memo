// passport.js
//
// for authenticating with Facebook
//

// load the appropriate dependencies
var passport = require('passport');
var config = require('./oauth/oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;

// configure Facebook Strategy for use by passport
// client ID, clientSecret, callbackURL come from ./oauth/oauth.js
passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({facebookId: profile.id}, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});


// a test express application for passport

var express = require('express');

var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUnitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
	function(req, res) {
		res.render('home', { user: req.user });
	});
app.get('/login',
	function(req, res) {
		res.render('login');
	});
app.get('/login/facebook',
	passport.authenticate('facebook'));
app.get('/login/facebook/return',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	});
app.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('profile', { user: req.user });
	});
app.listen(3000);