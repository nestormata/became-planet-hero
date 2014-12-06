var	passport        = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {
	passport.serializeUser(function(profile, done) {
		var query = connection.query(
			'SELECT * FROM Users WHERE FBID = ?',
			profile.id,
			function(err, result) {
				if (result && result.length > 0) {
					var user =  result[0];
	  			done(null, user);
				} else {
					// Error retrieving the user from DB
					console.log('User was not found on the DB');
	  			done(null, false);
				}
			}
		);
		console.log(query.sql);
	});
	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});
	// Use the FacebookStrategy within Passport.
	passport.use(new FacebookStrategy({
	    clientID: config.facebook_api_key,
	    clientSecret:config.facebook_api_secret ,
	    callbackURL: config.callback_url
			//profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
				//console.log(util.inspect(profile, {showHidden: false, depth: null, colors: true}));
	      //Further DB code.
				var query = connection.query(
					'REPLACE INTO Users (LastName, FirstName, Email, Country, City, FBID) VALUES (?, ?, ?, ?, ?, ?)', 
					[
						profile.name.familyName,
						profile.name.givenName,
						profile.emails[0].value,
						'--',
						'--',
						profile.id
					], 
					function(err, result) {
						console.log(err);
						console.log(result);
				});
				console.log(query.sql);
	      return done(null, profile);
	    });
	  }
	));
}