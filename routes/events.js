var express = require('express'),
    connection = require('../helpers/mysql.js'),
    router = express.Router();

// Get full list of event
router.get('/', function(req, res) {
  var query = connection.query('SELECT * from Events',
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('eventids', { rows: rows});
  });
  console.log(query.sql);
});

// Get information about event by id
router.get('/:id', function(req, res) {
  var query = connection.query('SELECT * from Events WHERE EventID=?', [req.params.id],
    function(err, rows, fields) {
        if (err) {throw err;}
        if (!rows.length) {return res.status(404).end();}
        res.render('eventids', { rows: rows});
  });
  console.log("Requested teamid - " + req.params.name);
});

// Create event
router.post('/create', function(req, res) {
  console.log(req.body);
  var query = connection.query('INSERT INTO Events(Type, Name, OcurrDate, Description) VALUES (?,?,?,?)', [req.param('type'), req.param('name'), req.param('date'), req.param('desc')],
    function(err, result) {
        if (err) {res.send('Please provide details'); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

// Delete event
router.delete('/', function(req, res) {
  console.log(req.body);
  var query = connection.query('DELETE FROM Events WHERE EventID=?', [req.param('id')],
    function(err, result) {
        if (err) {res.status(404).end(); throw err;}
        res.send('OK');
        console.log(result);
  });
  console.log(query.sql);
});

module.exports = router;