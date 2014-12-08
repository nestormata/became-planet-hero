var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

var entities = {
	title: 'Hero Leagues',
	home: '/teams/',
	can_add: true
};
var page_identifiers = ['teams'];

// Get full list of teams
router.get('/', function(req, res) {
	var action = {
		name: 'Add',
		title: 'Add a new league',
		method: 'POST',
		path: '/teams/create/',
		identifier: 'create'
	};
	// TODO: Do paging here
  var query = connection.query('SELECT * FROM Teams INNER JOIN Users ON Teams.OwnerID = Users.UserID ORDER BY Teams.TeamName',
    function(err, rows, fields) {
				var teams = false;
        if (err) {throw err;}
        if (rows.length > 0) {
					teams = rows;
				}
        res.render('teams', { 
					req: req,
					user: req.user,
					teams: teams,
					action: action,
					entities: entities,
					identifiers: page_identifiers.concat(['teams-front'])
				});
  });
  console.log(query.sql);
});

// Get information about team by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * FROM Teams INNER JOIN Users ON Teams.OwnerID = Users.UserID WHERE TeamID=?', [req.params.id],
    function(err, rows, fields) {
				var team = false;
				var members = [];
        if (err) {throw err;}
        if (!rows.length) {
					return res.status(404).render('teamids', { 
						req: req,
						user:req.user, 
						team: false,
						entities: entities,
						identifiers: page_identifiers.concat(['teams-team'])
					});
				}
				team = rows[0];
				// TODO: get the list of members here
        res.render('teamids', { 
					req: req,
					user:req.user, 
					team: team,
					entities: entities,
					identifiers: page_identifiers.concat(['teams-team'])
				});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Create team
router.post('/create', function(req, res) {
  var query = connection.query('INSERT INTO Teams(TeamName, TeamDescription, OwnerID) VALUES (?,?,?)', [req.param('team_name'), req.param('team_description'), req.param('team_owner')],
    function(err, result) {
        if (err) {res.send('Please provide proper details'); throw err;}
				req.session.message = 'The team has being added!';
        res.redirect('/teams');
        console.log(result);
  });
  console.log(query.sql);
});

// Delete team
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Teams WHERE TeamID=?', [req.param('id')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
				req.session.message = 'The team has being removed!';
        res.redirect('/teams');
        console.log(result);
  });
  console.log(query.sql);
});

// Add user to team
router.post('/add', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO TeamMembers(TeamID, UserID) VALUES (?,?)', [req.param('teamid'), req.param('userid')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Kick user from team
router.post('/kick', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM TeamMembers WHERE TeamID=? AND UserID=?', [req.param('teamid'), req.param('userid')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Update team (?) TBD
router.post('/update', function(req, res) {
  res.send('Coming soon');
});

module.exports = router;
