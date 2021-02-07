var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local"),
    flash         = require("connect-flash");
var methodOverride = require("method-override");
var request = require("request");
var mongoose = require("mongoose"),
    User = require("./models/user");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//connecting to atlas mongoDB
mongoose.connect(process.env.DATABASEURL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
//passport configuration
app.use(require("express-session")({
    secret : "hello",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(3000,function(){
    console.log("server is listening");
});