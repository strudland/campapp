var  express     = require("express"),
     app         =express(),
     bodyParser  =require("body-parser"),
     mongoose    =require("mongoose"),
     passport    =require("passport"),
     LocalStrategy =require("passport-local"),
     Campground  =require("./models/campground"),
     Comment     =require("./models/comment"),
     User        =require("./models/user"),
     seedDB      =require("./seeds");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
seedDB();

//mongoose.connect("mongodb://localhost/yelp_camp")

//passport configuration
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//tukaj dodamo v uporabo ime uporabnika v vsak template
app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});




//Campground.create(
//    {
//        name:"Granite Hill",
//        image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
//        description:"This is a huge grantit hill, no bathrooms. No water. Beautiful granite!"
//    }, function(err, campground){
//   if(err){
//            console.log(err);
//        } else {
//            console.log("Newly created campground");
//            console.log(campground);
//        }
//    });



app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allcampgrounds});    
        }
    });
            
    //res.render("campgrounds",{campgrounds:campgrounds});    
});

app.post("/campgrounds",function(req,res){
   //get data from form
   var name=req.body.name;
   var image=req.body.image;
   var desc =req.body.description;
   
   var newCampground = {name:name, image:image, description:desc}
   //create new campgrounds and save into database
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds
           res.redirect("/campgrounds");
       }
   });
   //campgrounds.push(newCampground);
   
   
});

app.get("/campgrounds/new",function(req,res){
   res.render("campgrounds/new"); 
});

//Campground.find({},function(err,campgrounds){
//    if(err){
//        console.log("OH NO, ERROR!");
//        console.log(err);
//    } else {
//        console.log("All CAMPGRUNDS...");
//        console.log(campgrounds);
//    }
//});
// show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/show",{campground: foundCampground});
       }
    });
});
//========================
//comments routes
//=========================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

//======
//auth routes!!
//=====

//show register form
app.get("/register",function(req, res){
    res.render("register");
});

//handle signup logic

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login",function(req, res){
    res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }), function(req, res){
    
});

//logout route

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The YelpCamp Server Has Started!!!") ;
});