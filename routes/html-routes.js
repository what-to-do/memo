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
};