var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of point history for all users
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Earned',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('points', { rows: rows});
  });
  console.log(query.sql);
});

// Get user points history by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Earned WHERE UserID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('points', { rows: rows});
  });
  console.log("Requested userid - " + req.params.name);
});

// Get full list of users who received specific badge
router.get('/badge/:id', function(req, res) {
  console.log(req.body);
  var query = connection.query('SELECT * from Earned Where BadgeID=?', [req.param.id],
    function(err, result) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('points', { rows: rows});
  });
  console.log("Requested badgeid - " + req.params.name);
});

// Grant/take away points to/from user
// Accepts negative values to penalize users
router.post('/grant', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Earned(UserID, BadgeID, Points) VALUES (?,?,?)', [req.param('uid'), req.param('bid'), req.param('points')],
    function(err, result) {
        if (err) {res.send('Please provide details'); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

module.exports = router;