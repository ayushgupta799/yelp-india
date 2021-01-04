var mongoose = require("mongoose"),
    campground = require("./models/campground"),
    comment = require("./models/comment");
var data = [
    {}
]

// function seedDB(){
//     campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("removes cg");
//         }
//     });
//     // add cg
//     campground.create({},function(err,comment){
//         if(err){
//             console.log(err);
//         } else {
//             campground.comments.push(comment);
//             campground.save();
            
//         }
//     });
// }

module.exports = seedDB;