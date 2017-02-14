var db = require('../models');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
//var hash = bcrypt.hashSync("12345");


/*where we will retrieve data from MySQL using sequelize and send to the client*/
module.exports = function (app) {
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

    //grab snippets by category using $.get("/api/view" + category_id)
    app.get('/api/view/:category?', function(req, res){
            console.log(req.params);
            db.Snippets.findAll({
            include: [db.Categories, db.Users],
            where: {category_id: req.params.category},
            order: '"updatedAt" DESC'
        }).then(function(data) {
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
    app.get('/api/:category', function(req, res){
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

        console.log(req.body);

        db.Snippets.create({
            snippet: req.body.snippet,
            importance: req.body.urgency,
            category_id: req.body.category
        }).then(function (data) {


            console.log(data);

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


/*=====================================USER QUERRIES=============================================*/
    //find the user when they login
    app.post('/login/complete', function(req, res){
        var pwd = req.body.password;
        console.log(pwd);
        db.Users.findOne({
            where: {username: req.body.email} 
        }).then(function(data, pwd){
            console.log(pwd);
            console.log(data.dataValues.password);
//            console.log(data.password);
//            console.log(req.body.password);
//            console.log(generateHash(req.body.password));
            //console.log(data);
             if (data == null) {
                res.redirect('/login');
            } else {
            res.redirect('/');
        }
        }).catch(function(err) {
            console.log(err);
        });

    });

    //log username and password to db when they signup
    app.post('/signup', function(req, res){
        var newpassword = bcrypt.hash
        // newpassword.password = newpassword.generateHash(req.body.password);
        // console.log(newpassword.password);
        db.Users.create({
                username: req.body.email,
                password: generateHash(req.body.password)
            }).then(function(data){
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
        });
};

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
}