var db = require('../models');
var nodemailer = require('../public/assets/js/nodemailer.js');

/*=========================USER SNIPPET QUERRIES===================================*/

/*RETRIEVING DATA FROM THE SQL DATABASE*/
module.exports = function(app) {

    //CREATE SNIPPET
    /*create a new snippet including snippet text, importance number, the category id and 
    the id of the user who is currently logged in*/
    app.post('/api/add/snippet', function(req, res) {
        db.Snippets.create({
            snippet: req.body.snippet,
            importance: req.body.urgency,
            categoryId: req.body.category,
            userId: req.user[0].id
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    //CREATE CATEGORY
    /*create a new category including the text of the name and the id of the user who 
    created it.  Capturing the user id will allow displaying on their categories upon
    logging in*/
    app.post('/api/add/category', function(req, res) {
        db.Categories.create({
            category: req.body.category,
            userCategoryId: req.user[0].id
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log("\ncategories create error\n");
            console.log(err);
        });
    });

    //READ ALL SNIPPETS
    /*reads all snippets and includes the Users and Categories tables to include which
    user and category the snippet belongs to*/
    app.get('/api/view/', function(req, res) {
        db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {
                userId: req.user[0].id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    //READ SNIPPETS BY CATEGORY
    /*Reads the snippets by the user id and category id to only provide data of the 
    snippets created by the current user and category it was assigned*/
    app.get('/api/view/:category?', function(req, res) {
        db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {
                categoryId: req.params.category,
                userId: req.user[0].id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    //READ ALL CATEGORIES TO PRODUCE CATEGORY BUTTONS
    /*Reads all the categories created by the current user.  This data will be used to 
    display the category buttons on the page*/
    app.get('/api/categories', function(req, res) {
        db.Categories.findAll({
            where: {
                userCategoryId: req.user[0].id
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    //UPDATE SNIPPET
    /*The user can update the text and importance categories of their snippets*/
    app.post('/api/edit', function(req, res) {
        console.log(req.body.snippet_id);
        db.Snippets.update({
            snippet: req.body.snippet
        }, {
            where: {
                id: req.body.snippet_id
            }
        }).then(function(data) {
            res.redirect('/');
            console.log("\Nupdated snippet\n");
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.post('/api/email', function(req, res) {
        nodemailer(req.body.recipient, req.body.title, req.body.message);
    });

    //DELETE SNIPPET
    /*Delete the users snippet they select*/
    app.post('/api/delete', function(req, res) {
        console.log(req.body);
        db.Snippets.destroy({
            where: {
                id: req.body.user_delete
            }
        }).then(function(data) {
            res.redirect('/');
        }).catch(function(err) {
            console.log(err);
        });
    });

    //SORT
    /*This will sort the importance column by ascending or descending*/
    app.get('/api/sort/:arrow/:column', function(req, res) {
        db.Snippets.findAll({
            include: [db.Users, db.Categories],
            where: {
                userId: req.user[0].id
            },
            order: 'importance ' + req.params.arrow
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    /*========================END OF SNIPPET QUERRIES============================*/

}; //END OF modules.export()