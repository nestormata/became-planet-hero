//Define MySQL parameter in Config.js file.
var express         = require('express'),
	app 			= express();
	mysql           = require('mysql');
	config          = require('../configuration/config.' + app.get('env'));

var connection = mysql.createConnection({
	  host     : config.host,
	  user     : config.username,
	  password : config.password,
	  database : config.database
	});

module.exports = connection;