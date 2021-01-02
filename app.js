var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose"),
    campground = require("./models/campground");

const connurl = "mongodb+srv://admin:qwerty123@cluster0.pn1m3.mongodb.net/yelp?retryWrites=true&w=majority";
mongoose.connect(connurl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// schema


// campground.create({
//     name : "Solang Valley",
//     image : "https://i.imgur.com/vqEsn6o.jpg?1"
// },function (err,campground){ 
//     if(err){
//         console.log(err);
//     } else {
//         console.log("okok");
//         console.log(campground);
//     }
// });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
// var campgrounds=[
//     {name :"Spiti Valley" ,image :"https://i.imgur.com/vqEsn6o.jpg?1"},
//     {name :"Chandratal lake", image :"https://i.imgur.com/G5dU3Zx.jpg"},
//     {name :"Solang Valley" ,image :"https://i.imgur.com/FDhzVukg.jpg"}
// ];
app.get("/",function(req,res){
    res.redirect("campgrounds");
});
app.get("/campgrounds",function(req,res){
    //from db 
    campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds:allcampgrounds});
        }
    })
});

app.post("/campgrounds",function(req,res){
    // var name =req.body.name;
    // var image = req.body.image;
    var newCampground ={
        name: req.body.name,
        image: req.body.image,
        description: req.body.description}

    campground.create(newCampground, function(err, newlycreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);
    // res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
    //from db 
    campground.findById(req.params.id, function(err, foundcampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campgrounds:foundcampground});
        }
    })
});

app.listen(3000,function(){
    console.log("server is listening");
});