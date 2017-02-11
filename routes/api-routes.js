var db = require('../models');
var path = require('path');

module.exports = function(app){
	app.get('/api/view', function(req, res){
		db.Categories.findAll().then(function(data){
			console.log('\nfindall categories data\n');
			res.json(data[0].dataValues);
			console.log(data[0].dataValues);
		}).catch(function(err){
			console.log("\ncategories find all error\n");
			console.log(err);
		});
	});
	
	app.post('/create', function(req, res){
		db.Categories.create({
			category: req.body.category
		}).then(function(data){
			console.log(data);
		}).catch(function(err){
			console.log("\ncategories create error\n");
			console.log(err);
		});

		db.Snippets.create({
			snippet: req.body.snippet,
			importance: req.body.importance,
		}).then(function(data){
			console.log(data);
		}).catch(function(err){
			console.log('\nsnippet create error\n');
			console.log(err);
		});
	});


};
