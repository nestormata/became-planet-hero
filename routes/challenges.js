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
      if (err || !rows.length) {return res.status(404).end();}
      res.render('challengeids', { rows: rows});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Complete challenge
router.post('/complete', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO UserChallenges(UserID, ChallengeID) VALUES (?,?)', [req.param('uid'), req.param('cid')],
    function(err, result) {
      if (err) {console.log(err); res.send('Please provide correct details'); return;}
      console.log(result);
      var query2 = connection.query('SELECT Points from Challenges WHERE ChallengeID=?', [req.param('cid')],
      function(err, rows, fields) {
        if (err || !rows.length) {return res.status(404).end();}
        var query3 = connection.query('INSERT INTO Earned(UserID, Points) VALUES (?,?)', [req.param('uid'), rows[0].Points],
        function(err, result) {
          if (err) {res.send('Please provide correct details'); return;}
          res.send('OK');
          console.log(result);
        });
      });
  });
  console.log(query.sql);
});

// Create challenge
router.post('/create', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Challenges(Type, Name, Description, Points) VALUES (?,?,?,?)', [req.param('type'), req.param('name'), req.param('desc'), req.param('points')],
    function(err, result) {
      if (err) {res.send('Please provide details'); return;}
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
      if (err) {res.status(404).end(); return;}
      res.send('OK');
      console.log(result);
  });
  console.log(query.sql);
});

module.exports = router;