var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var mongoose = require("mongoose");
//index
router.get("/",function(req,res){
    //from db 
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds});
        }
    });
});
//create
router.post("/",isLoggedIn ,function(req,res){
    var newCampground ={
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author : {
            id: req.user._id,
            username: req.user.username
        }} 
    Campground.create(newCampground, function(err, newlycreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlycreated);
            res.redirect("/campgrounds");
        }
    });
});
//new
router.get("/new", isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//show
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground:foundcampground});
        }   
    })
});

//middleware
function isLoggedIn(req,res , next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;