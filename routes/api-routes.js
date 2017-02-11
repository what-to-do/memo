var db = require('../models');
var path = require('path');

module.exports = function(app){
	app.get('/api/view', function(req, res){
		db.Categories.findAll().then(function(data){
			console.log('\nfindall categories data\n');
			res.json(data);
			console.log(data);
		}).catch(function(err){
			console.log("\ncategories find all error\n");
			console.log(err);
		});
	});
	
	app.post('/api/add', function(req, res){
		db.Categories.create({
			category: req.body.category
		}).then(function(data){
			res.json(data);
			console.log(data);
		}).catch(function(err){
			console.log("\ncategories create error\n");
			console.log(err);
		});

	/*	db.Snippets.create({
			snippet: req.body.snippet,
			importance: req.body.importance,
		}).then(function(data){
			console.log(data);
		}).catch(function(err){
			console.log('\nsnippet create error\n');
			console.log(err);
		});
	});

	app.delete('/delete/:id', function(req, res){
		db. Categories.destroy({
			where: req.params.id
		}).then(function(data){
			console.log(data);
		}).catch(function(err){
			console.log(err);
		});*/
	});



};

	// passport authentication routes

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

