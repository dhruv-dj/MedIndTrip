var express = require('express');
var router = express.Router();
var product = require('../models/product');
var passport = require('passport');

var csrf = require('csurf');

var csrfProtect = csrf();
router.use(csrfProtect);

router.get('/signup', function(req,res,next){
    res.render('user/signup', {csrfToken : req.csrfToken()});
})

router.get('/signin', function(req,res,next){
  
  res.render('user/signin', {csrfToken : req.csrfToken()});
})
router.post('/signin',  passport.authenticate('local-signin', { successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true })
)


router.post('/signup',  passport.authenticate('local-signup', { successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true })
)

router.get('/profile',isLoggedIn,function(req,res,next){
  //console.log(req);  
  res.render('user/profile',{csrfToken : req.csrfToken()});
})

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req,res,next){
    if(req.user){
        return next();
    }
    res.redirect('/user/signin');
}

module.exports = router;