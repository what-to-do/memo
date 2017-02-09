var db = require('../models');

module.exports = function(app){
	app.get('/', function(req, res){
		db.Tests.findAll().then(function(data){
			console.log(data);
		});
	});
};