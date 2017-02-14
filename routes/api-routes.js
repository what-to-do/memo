var db = require('../models');
var path = require('path');

/*where we will retrieve data from MySQL using sequelize and send to the client*/
module.exports = function (app) {
    app.get('/api/view', function (req, res) {
        db.Snippets.findAll({
            include: [db.Categories, db.Users]
        }).then(function (data) {
            console.log('\nfindall categories data\n');
            res.json(data);
        }).catch(function (err) {
            console.log("\ncategories find all error\n");
            console.log(err);
        });

    });

    app.get('/api/categories', function(req, res){
        db.Categories.findAll({

        }).then(function(data){
            console.log(data);
            res.json(data);
        }).catch(function(err){
            console.log(err);
        });
    });

    //get snippets by category
    app.get('/api/:cateogory', function(req, res){
        if(req.params.category){
            db.Snippets.findAll({
                include: [db.Categories, db.Users],
                where: {category: req.params.category}
            }).then(function(data){
                res.json(data);
            }).catch(function(err){
                console.log(err);
            });
        }
    });
    

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




    app.post('/api/add/snippet', function (req, res) {
        //create snippet
        db.Snippets.create({
            snippet: req.body.snippet,
            importance: req.body.urgency,
            category: req.body.category
        }).then(function (data) {
            res.json(data);
            /*console.log(data);*/
        }).catch(function (err) {
            console.log('\nsnippet create error\n');
            console.log(err);
        });
    });

    //edit snippet
    app.post('/api/edit', function(req, res){
        db.Snippets.update({
            snippet: req.body.snippet
        },
        {
            where: {id : req.body.snippet_id}
        }).then(function(data){
            res.redirect('/');
            console.log("updated\n" + data);
        }).catch(function(err){
            console.log(err);
        });
    });

    //delete snippet
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

    //find the user when they login
    app.post('/login/complete', function(req, res){
        db.Users.findOne({
            where: {username: req.body.email} 
        }).then(function(data){
            res.json(data);
        });
    });
});
    
};


