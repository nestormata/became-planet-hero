var express = require('express');
var router = express.Router();

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});
//Passport Router
router.get('/auth/facebook', passport.authenticate('facebook'));
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
