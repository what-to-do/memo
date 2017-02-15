var LocalStrategy = require('passport-local').Strategy; // passport module for local authentication
var FacebookStrategy = require('passport-facebook').Strategy; // passport module for facebook 
var db = require('./models');
var User = require('./models/user');
var configAuth = require('./oauth/oauth');  // load stored facebook application id and secret and callback
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');  // npm package for encryption
var hash = bcrypt.hashSync("12345");  // create a temporary hash

module.exports = function(passport) {
// required to serialize and deserialize users in passport
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
// local authentication steps
  passport.use('local-signup', new LocalStrategy({
    username : 'email',
    password: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log(email, password);
    process.nextTick(function() {
      // add a user in the db using the inputted email and password from 
      // /signup
      db.User.findOne({ 'username' : email }, function(err, user) {
        if (err)
          return done(err);
        // return flash message if error
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();

          newUser.local.email   = email;
          newUser.local.password  = newUser.generateHash(password);   // hash the password

          newUser.save(function(err) {
            if (err) 
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
  // search the users db for the inputted login and password
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
       console.log(email, password);
        db.Users.findOne({
          where: {username: req.body.email} 
        }).then(function(user) {
          if (user == null) {
            return done(null, false, { message: 'Incorrect credentials.' })
          }
          // compare the hashed password with the stored password
          var hashedPassword = bcrypt.hashSync(password, user.salt)

          if (user.password === hashedPassword) {
            return done(null, user)
          }

          return done(null, false, { message: 'Incorrect credentials.'})
        })
        // }).then(function(err, data){
        //     if (err)
        //       return done(err);
        //     if (username) 
        //       return done(null, false, req.flash('loginMessage', 'No user found.'));
            
        //     if (!user.validPassword(req.body.password, "12345")) {
        //       console.log(req.body.password);
        //       return done(null, false, req.flash('loginMessage', 'Invalid password.'));
        //     }
        //     return done(null, user);
        }));

  
  // facebook passport access
  passport.use(new FacebookStrategy({
    // these are given by facebook development console
    clientID  : configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL : configAuth.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    // displays the returned fb ID and name properly
    console.log(profile.id);      
    console.log(profile.displayName);
            // add id and name to db.  does not do so uniquely
            db.Users.create({
                facebook_id: profile.id,
                display_name: profile.displayName
            }).then(function(data){
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
    // added to break waiting for a response from localhost
    return done(null);
    }));
};
    // process.nextTick(function() {
    //   db.Users.findOne({ 'facebook.id' : profile.id }, function(err, user) {
    //     if (err)
    //       console.log(err);
    //       return done(err);
    //     if (user) {
    //       return done(null, user);
    //     } else {
    //       var newUser = Users();
    //       newUser.facebook.id = profile.id;
    //       newUser.facebook.token = token;
    //       newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    //       newUser.facebook.email = profile.emails[0].value;

    //       newUser.save(function(err) {
    //         if (err)
    //           throw err;

    //         return done(null, newUser);
        //   });
        // }
        
      // });
    // };

  // }));
  
// function to hash the password using the bcrypt module
// second parameter is the hash function
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password, storedPassword) {
  // compares the password and the hashed stored password
    console.log(password);
    console.log(storedPassword);
    console.log(bcrypt.compareSync(password, storedPassword));
    return bcrypt.compareSync(password, storedPassword);
}