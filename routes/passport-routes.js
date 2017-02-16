var currentUser = require('./../server');

var db = require('../models');
// display the login page
module.exports = function(app, passport) {
	
	// OAuth
    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res) {
        

        	
        });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
        /*	console.log("auth/facebook/callback");*/
        	//user facebook data after login
        	/*console.log(req.user[0].id);
        	console.log(req.user[0].name);
        	console.log(req.user[0].oauthId);*/
        	
        	//Send back a response to finish this request.
        	/*res.setHeader('Access-Control-Allow-Origin','*');*/
        	//See if the new page request actually has session information
        	//Courtesy of Assport.js 
      		res.redirect('/');
        });

    app.get('/login', function(req, res) {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    // should call after facebook login is complete
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user);
        /*res.render('profile', {
            user: req.user
        });*/
    });
    // universal logout route
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
// passport provided login function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}