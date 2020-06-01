var FacebookStrategy = require('passport-facebook').Strategy;
import { UserFacebook } from '.././src/models';
var configAuth = require('./index');


module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		UserFacebook.findById(id, function(err, user){
			done(err, user);
		});
	});


passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            UserFacebook.findOne({'facebook.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new UserFacebook();
                    newUser.id = profile.id;
                    console.log("ID="+newUser.id);
                    newUser.token = accessToken;
                    newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                    if(profile.emails !== undefined){
                    newUser.email = profile.emails[0].value;
                    }
                    else{
                    newUser.email = "";  
                    }
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);
                }
            });
        });
    }

));

}