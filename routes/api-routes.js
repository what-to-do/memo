var db = require('../models');
var path = require('path');

/*=========================USER SNIPPET QUERRIES===================================*/

/*RETRIEVING DATA FROM THE SQL DATABASE*/
module.exports = function (app) {
    
    //CREATE SNIPPET
    app.post('/api/add/snippet', function (req, res) {
        db.Snippets.create({
            snippet: req.body.snippet,
            importance: req.body.urgency,
            categoryId: req.body.category,
            userId: req.user[0].id
        }).then(function (data) {
            console.log("\ncreated snippet\n");
            res.json(data);
        }).catch(function (err) {
            console.log('\nsnippet create error\n');
            console.log(err);
        });
    });

     //CREATE CATEGORY
    app.post('/api/add/category', function(req, res){
        db.Categories.create({
            category: req.body.category,
            userCategoryId: req.user[0].id
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.log("\ncategories create error\n");
            console.log(err);
        });
    });

    //READ ALL SNIPPETS
    app.get('/api/view/', function (req, res) {
        console.log("find all");
        console.log(req.user);
        db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {userId: req.user[0].id}/*,
            order: '"importance" DESC'*/
        }).then(function(data) {
            console.log('\nfindall categories data\n');
            res.json(data);
        }).catch(function (err) {
            console.log("\ncategories find all error\n");
            console.log(err);
        });
    });

    //READ SNIPPETS BY CATEGORY
    app.get('/api/view/:category?', function(req, res){
            console.log(req.params);
            db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {categoryId: req.params.category, 
                                 userId: req.user[0].id},
            order: '"updatedAt" DESC'
        }).then(function(data) {
            console.log("\nfind snippets by category\n");
            res.json(data);
        }).catch(function (err) {
            console.log("\ncategories find all error\n");
            console.log(err);
        });
    });

    //READ ALL CATEGORIES TO PRODUCE CATEGORY BUTTONS
    app.get('/api/categories', function(req, res){
        db.Categories.findAll({
            where: {userCategoryId: req.user[0].id}
        }).then(function(data){
            
            res.json(data);
        }).catch(function(err){
            console.log(err);
        });
    });

    //UPDATE SNIPPET
    app.post('/api/edit', function(req, res){
        db.Snippets.update({
            snippet: req.body.snippet
        },
        {
            where: {id : req.body.snippet_id}
        }).then(function(data){
            res.redirect('/');
            console.log("\Nupdated snippet\n");
        }).catch(function(err){
            console.log(err);
        });
    });

    //DELETE SNIPPET
    app.post('/api/delete', function (req, res) {
        console.log(req.body);
        db.Snippets.destroy({
            where: {id : req.body.user_delete}
        }).then(function (data) {
            console.log(data);
            res.redirect('/');
        }).catch(function (err) {
            console.log(err);
        });
    });

    //SORT
    
    app.get('/api/sort/:arrow/:column', function(req, res){
        console.log(req.params.arrow);
        db.Snippets.findAll({
            include: [db.Users, db.Categories],
            where: {userId: req.user[0].id},
            order: req.params.column + ' ' + req.params.arrow
        }).then(function(data) {
            res.json(data);
        }).catch(function (err) {
            console.log(err);
        });
    });
    
/*========================END OF SNIPPET QUERRIES============================*/




}; //END OF modules.export()

