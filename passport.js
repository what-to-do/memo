var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./models');
var User = require('./models/user');
var configAuth = require('./oauth/oauth');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("12345");

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    username : 'email',
    password: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log(email, password);
    process.nextTick(function() {

      db.User.findOne({ 'username' : email }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();

          newUser.local.email   = email;
          newUser.local.password  = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) 
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

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

  

  passport.use(new FacebookStrategy({
    clientID  : configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL : configAuth.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    console.log(profile.id);
    console.log(profile.displayName);

            db.Users.create({
                facebook_id: profile.id,
                display_name: profile.displayName
            }).then(function(data){
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
    
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
  

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password, storedPassword) {
    console.log(password);
    console.log(storedPassword);
    console.log(bcrypt.compareSync(password, storedPassword));
    return bcrypt.compareSync(password, storedPassword);
}