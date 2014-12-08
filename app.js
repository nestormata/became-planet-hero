var express         = require('express'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session'),
    passport        = require('passport'),
    FBStrategy      = require('passport-facebook').Strategy,
    util            = require('util'),

    routes          = require('./routes/index'),
    users           = require('./routes/users'),
    teams           = require('./routes/teams'),
    events          = require('./routes/events'),
    challenges      = require('./routes/challenges'),
    badges          = require('./routes/badges'),
    points          = require('./routes/points'),
    app             = express(),
    config          = require('./configuration/config.' + app.get('env')),
    connection      = require('./helpers/mysql.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Connect to Database only if Config.js parameter is set.
if(config.use_database==='true')
{
    connection.connect();
}
// Passport session setup.
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
// Use the FBStrategy within Passport.
passport.use(new FBStrategy({
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

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'hackhathon', key: 'sid', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/login', routes);
app.use('/users', users);
app.use('/teams', teams);
app.use('/events', events);
app.use('/challenges', challenges);
app.use('/badges', badges);
app.use('/points', points);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
