
var FacebookStrategy = require('passport-facebook').Strategy; // passport module for facebook 
var db = require('../../../models');
var User = require('../../../models/user');
var configAuth = require('../../../oauth/oauth');  // load stored facebook application id and secret and callback
var sequelize = require('sequelize');

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
