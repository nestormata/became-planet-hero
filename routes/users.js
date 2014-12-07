var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of teams
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Users',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.send(404);}
        res.render('userids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about team by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Users WHERE UserID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.send(404);}
        res.render('userids', { rows: rows});
  });

  console.log("Requested userid - " + req.params.name);
});

// Delete user
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Users WHERE UserID=?', [req.param('id')],
    function(err, result) {
        if (err) {res.send("Failure"); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Update user profile (?) TBD
router.post('/update', function(req, res) {
  res.send('Coming soon');
});

module.exports = router;
