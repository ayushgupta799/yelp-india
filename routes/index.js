var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//root route
router.get("/",function(req,res){
    res.render("landing");
});

//auth route
//show reg form
router.get("/register", function(req, res){
    res.render("register");
});  
//handle signup logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register")
        }
        passport.authenticate("Local")(req, res , function(){
            req.flash("success","Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds")
        });
    });
});
//show login form
router.get("/login", function(req,res){
    res.render("login");
});

//handling login logic route
router.post("/login" , passport.authenticate("local" , 
    {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }), function(req,res){});
//logout
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "logged out :(");
    res.redirect("/campgrounds");
});

module.exports = router;