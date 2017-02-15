var db = require('../models');
var path = require('path');

/*=========================SNIPPET QUERRIES===================================*/

/*RETRIEVING DATA FROM THE SQL DATABASE*/
module.exports = function (app) {
    
    //CREATE SNIPPET
    app.post('/api/add/snippet', function (req, res) {
        db.Snippets.create({
            snippet: req.body.snippet,
            importance: req.body.urgency,
            category_id: req.body.category
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
            SnippetId: 1
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.log("\ncategories create error\n");
            console.log(err);
        });
    });

    //READ ALL SNIPPETS
    app.get('/api/view/', function (req, res) {
        db.Snippets.findAll({
            include: [db.Categories, db.Users],
            order: '"updatedAt" DESC'
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
            where: {category_id: req.params.category},
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

/*========================END OF SNIPPET QUERRIES============================*/

/*=============================USER QUERRIES=================================*/
    //CREATE USER LOGIN DATA
    app.post('/signup/complete', function(req, res){
       console.log(req.body);
        db.Users.create({
                username: req.body.email,
                password: req.body.password
            }).then(function(data){
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
    });

    //CHECK IF USERNAME & PASSWORD ARE CORRECT
    //IF CORRECT REDIRECT TO /view/:user?
    app.post('/login', function(req, res){
        db.Users.count({
            where: {username: req.body.username, password: req.body.password}
        }).then(function(data){
            /*if count is true that means the username/password match
            redirect the user to the url that finds all their snippets*/
            if(count == 1){
              
            }else{
                alert("incorrect username/password, please try again");
                res.redirect('/login');
            }
        });
    });

    //FIND ALL SNIPPETS BY USER_ID
    app.get('/view/:user_id?', function(req, res){
        db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {user_id: req.body.user}
        }).then(function(data){
            res.json(data);
        }).catch(function(err){
            console.log(err);
        });
    });

    //READ USER SNIPPETS BY CATEGORY


    //READ ALL USER CATEGORIES TO PRODUCE CATEGORY BUTTONS



    //UPDATE USER SNIPPET

    

    //DELETE USER SNIPPET




}; //END OF modules.export()

