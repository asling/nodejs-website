var express = require('express');
var passport = require('passport');
var {ensureLoggedIn} = require("ensure-login");
var router = express.Router();
router.get('/home', ensureLoggedIn({baseUrl:'/', redirectTo:'/login'}), function (req, res) {
    res.redirect(301,'/');
});

router.get("/",ensureLoggedIn({baseUrl:'/', redirectTo:'/login'}),function(req,res){
	console.log("user",req.user);
	res.render('home', { user : req.user });
});

router.get("/login",function(req,res){
	console.log("user",req.user);
	if(req.user){
		res.redirect(301,'/');
	}else{
		res.render('login', { user : req.user });
	}
	
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
});

module.exports = router;