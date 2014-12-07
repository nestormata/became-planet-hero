var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of teams
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Teams',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('teamids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about team by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Teams WHERE TeamID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('teamids', { rows: rows});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Create team
router.post('/create', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Teams(TeamName, TeamDescription, OwnerID) VALUES (?,?,?)', [req.param('name'), req.param('desc'), req.param('owner')],
    function(err, result) {
        if (err) {res.send('Please provide proper details'); throw err;}
        res.send('OK');
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
        res.send('OK');
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