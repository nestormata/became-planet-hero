var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of badges
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Badges',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('badgeids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about badge by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Badges WHERE BadgeID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('badgeids', { rows: rows});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Create badge
router.post('/create', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Badges(Name, Description, Identifier, Points) VALUES (?,?,?,?)', [req.param('name'), req.param('desc'), req.param('identifier'), req.param('points')],
    function(err, result) {
        if (err) {res.send('Please provide details'); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Delete badge
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Badges WHERE BadgeID=?', [req.param('id')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

module.exports = router;