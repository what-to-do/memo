var passport = require('passport');
var config = require('../oauth/oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
require('../passport.js');

// passport authentication routes
var path = require('path');

module.exports = function(app){
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
	app.get('/', function(req, res) {
		res.render('index', { user: req.user });
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});
	
	app.get('/login/facebook', 
		passport.authenticate('facebook'));
	
	app.get('/login/facebook/return',
		passport.authenticate('facebook', { 
			failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
	});
	
	app.get('/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res) {
			res.render('profile', { 
				user: req.user 
			});
	});
};