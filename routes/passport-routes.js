var db = require('../models');
// display the login page
module.exports = function(app, passport) {
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});
	// callback from login page upon passport authentication
	app.post('/login/complete', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));
	// display the signup webpage
	app.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});
	// callback from signup webpage
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));
	// a duplicate route?
	app.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});
	// a duplicate route?
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));
//	
	// should call after facebook login is complete
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});
	// universal logout route
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	// facebook login route
	app.get('/login/facebook', passport.authenticate('facebook', { scope : 'email'}));
	// facebook login callback route.  if fail return to signup page, if successful go to main app
	app.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/signup'
		}));
};
// passport provided login function
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}