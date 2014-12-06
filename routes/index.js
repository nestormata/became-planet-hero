var express = require('express');
var passport = require('passport');
var router = express.Router();
var util = require('util');

/* GET home page. */
router.get('/', function(req, res) {
	console.log(util.inspect(req.user, {showHidden: false, depth: null, colors: true}));
  res.render('index', { 
		title: 'Became a Planet Hero', 
		subtitle: 'Make a little difference and save the world',
		user: req.user 
		});
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});
//Passport Router
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'user_about_me', 'user_photos', 'email', 'user_location']}));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    res.redirect('/');
  });
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
