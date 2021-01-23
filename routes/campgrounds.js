var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var mongoose = require("mongoose");
const campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/",middleware.isLoggedIn ,function(req,res){
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
router.get("/new", middleware.isLoggedIn,function(req,res){
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
//edit cg route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id , function(err , foundcampground){
        res.render("campgrounds/edit", {campground: foundcampground});
    });

});
//update cg route
router.put("/:id",middleware.checkCampgroundOwnership ,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// destroy 
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;