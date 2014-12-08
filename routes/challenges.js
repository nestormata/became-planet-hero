var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of challenges
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Challenges',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('challengeids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about challenge by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Challenges WHERE ChallengeID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('challengeids', { rows: rows});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Create challenge
router.post('/create', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Challenges(Type, Name, Description, Points) VALUES (?,?,?,?)', [req.param('type'), req.param('name'), req.param('desc'), req.param('points')],
    function(err, result) {
        if (err) {res.send('Please provide details'); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Delete challenge
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Challenges WHERE ChallengeID=?', [req.param('id')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

module.exports = router;