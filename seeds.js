var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Nulla dictum luctus leo at eleifend. Vestibulum eget condimentum nunc, a luctus nisl. Nam vel quam felis. Quisque bibendum, neque eget viverra scelerisque, ex augue hendrerit tellus, sit amet gravida lorem urna non dui. Nulla rhoncus nulla in urna mollis, a suscipit velit aliquet. Praesent aliquet euismod interdum. Donec ut leo quis nulla condimentum pellentesque. Nullam eget lectus efficitur, ultricies erat ac, consequat dolor. Mauris aliquam gravida molestie. Sed gravida et velit et euismod. Quisque purus nulla, lobortis a bibendum ac, lacinia vitae lacus. Morbi accumsan semper lorem at iaculis. Proin maximus sapien sed consequat sodales."
        },
        {
            name: "Desert Mesa",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
            description: "Nulla dictum luctus leo at eleifend. Vestibulum eget condimentum nunc, a luctus nisl. Nam vel quam felis. Quisque bibendum, neque eget viverra scelerisque, ex augue hendrerit tellus, sit amet gravida lorem urna non dui. Nulla rhoncus nulla in urna mollis, a suscipit velit aliquet. Praesent aliquet euismod interdum. Donec ut leo quis nulla condimentum pellentesque. Nullam eget lectus efficitur, ultricies erat ac, consequat dolor. Mauris aliquam gravida molestie. Sed gravida et velit et euismod. Quisque purus nulla, lobortis a bibendum ac, lacinia vitae lacus. Morbi accumsan semper lorem at iaculis. Proin maximus sapien sed consequat sodales."
        },
        {
            name: "Triglav",
            image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
            description: "Nulla dictum luctus leo at eleifend. Vestibulum eget condimentum nunc, a luctus nisl. Nam vel quam felis. Quisque bibendum, neque eget viverra scelerisque, ex augue hendrerit tellus, sit amet gravida lorem urna non dui. Nulla rhoncus nulla in urna mollis, a suscipit velit aliquet. Praesent aliquet euismod interdum. Donec ut leo quis nulla condimentum pellentesque. Nullam eget lectus efficitur, ultricies erat ac, consequat dolor. Mauris aliquam gravida molestie. Sed gravida et velit et euismod. Quisque purus nulla, lobortis a bibendum ac, lacinia vitae lacus. Morbi accumsan semper lorem at iaculis. Proin maximus sapien sed consequat sodales."
        },
        {
            name: "Mangart",
            image: "https://farm8.staticflickr.com/7179/6927088769_cc14a7c68e.jpg",
            description: "Nulla dictum luctus leo at eleifend. Vestibulum eget condimentum nunc, a luctus nisl. Nam vel quam felis. Quisque bibendum, neque eget viverra scelerisque, ex augue hendrerit tellus, sit amet gravida lorem urna non dui. Nulla rhoncus nulla in urna mollis, a suscipit velit aliquet. Praesent aliquet euismod interdum. Donec ut leo quis nulla condimentum pellentesque. Nullam eget lectus efficitur, ultricies erat ac, consequat dolor. Mauris aliquam gravida molestie. Sed gravida et velit et euismod. Quisque purus nulla, lobortis a bibendum ac, lacinia vitae lacus. Morbi accumsan semper lorem at iaculis. Proin maximus sapien sed consequat sodales."
        }
    ]


function seedDB(){
    // remove all
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err) {
                        console.log(err);
                        } else {
                            console.log("Added Campground!!");
                            //create comment
                            Comment.create(
                                {
                                    text: "This place is great, but i wish there was internet",
                                    author: "Homer"
                                }, function(err,comment){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save(); 
                                        console.log("Created new comment");
                                    }
                                    
                                });
                        }
                })  ;
            });
        }
    });
    //add a fer campgrounds
}

module.exports = seedDB;