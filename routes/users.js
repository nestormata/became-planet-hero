var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of teams
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Users',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('userids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about team by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Users WHERE UserID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('userids', { rows: rows});
  });
  console.log("Requested userid - " + req.params.name);
});

// Delete user
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Users WHERE UserID=?', [req.param('uid')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Ban user profile
router.post('/ban', function(req, res) {
  console.log(req.body);
  qresult = "";
  var query = connection.query('UPDATE Users SET Status = 1 WHERE UserID=? AND Status = 0', [req.param('uid')],
  function(err, result) {
    if (err) {throw err;}
    if (result.affectedRows == "1") {
      query = connection.query('INSERT INTO UserBans(UserID, InitializerID) VALUES (?,?)', [req.param('uid'), req.param('inid')],
      function(err, result) {
            if (err) {throw err;}
            console.log(result);
      });
      console.log(query.sql);
      return res.send('OK');
    }
    msg = "User already banned";
    res.send(msg);
    console.log(msg);
  });
});

// Ban user profile
router.post('/unban', function(req, res) {
  console.log(req.body);
  var query = connection.query('UPDATE Users SET Status = 0 WHERE UserID=? AND Status = 1', [req.param('uid')],
  function(err, result) {
        if (err) { throw err;}
        if (result.affectedRows == "0") {
          return res.send('User is not banned');
        }
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
