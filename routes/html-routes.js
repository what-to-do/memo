// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var db = require('../models');

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
	app.get("/", function(req, res) {
  	
		res.sendFile(path.join(__dirname + "/../public/assets/html/index.html"));
  	
  	});
  // Each of the below routes just handles the HTML page that the user gets sent to.
  // index route loads view.html
  app.get("/correct", function(req, res) {
  	/*console.log(req.user[0]);
  	console.log(req.user[0].id);
  	db.Snippets.findAll({
  		include: [db.Users, db.Categories],
  		where: {userID: req.user[0].id}
  	}).then(function(data){
		res.sendFile(path.join(__dirname + "/../public/assets/html/index.html"));
  	}).catch(function(err){
  		console.log(err);
  	});*/
  	


  });

  app.get("/signup", function(req, res) {
  	res. sendFile(path.join(__dirname + "/../public/assets/html/signup.html"));
  });

 
};
