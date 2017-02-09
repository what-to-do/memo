var db = require('../models');

module.exports = function(app){
	app.get('/', function(req, res){
		db.Categories.findAll().then(function(data){
			console.log(data);
		});
	});
};