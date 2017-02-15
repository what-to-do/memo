var db = require('../models');
// display the login page
module.exports = function(app, passport) {
	// OAuth
    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res) {});

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

    app.get('/login', function(req, res) {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    // should call after facebook login is complete
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        });
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