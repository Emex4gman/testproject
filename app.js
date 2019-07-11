var express         = require("express")
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    User            = require("./models/user"), //MONGOOSE CONFIG
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    passportLocalMongoose= require("passport-local-mongoose"),
    methodOverride  = require("method-override"),
    jwt             = require('jsonwebtoken');
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//DATABABSE CONFIG
mongoose.connect("mongodb://localhost/emexapi",  {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(methodOverride("_method"));



//SEED USER
// User.create({
//     username: "emex",
//     password: "emex",
// });


//PASSPORT CONFIG
app.use(require("./node_modules/express-session")({
    secret:"hell yes",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
        res.render("landing");
    }); 



// index route 
app.get("/emex", function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        }else{
            res.render("index",{users: users});
        }
    });    
});


// show route will show a users secrst page containing thire username and an update form
app.get("/emex/:id", function(req, res){
    res.render("secret");
});

//Auth routs
//login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/emex"
}) , function(req, res){
    
});

//SIGN UP
// create route 
// app.post("/emex", function(req, res){
//     var username = req.body.username;
//     var password =  req.body.password;
//     var newUser = { username: username, password: password};

//     User.create(newUser, function(err, newlyUser){
//         if(err){
//             console.log(err);
//         } else{
//             // newlyUser.save();
//             res.redirect("/emex")
//         }
//     });
    
// });
app.post("/emex", function(req, res){
    req.body.username; // gets the username and password that was inputed
    req.body.password;
    //registers the details and turns the password into hash code and also saves into database
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            // res.render("index"); 
        }
        // the this code below use the local option which can be changed to any other authtication method like google, facebook or even twitter
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});


//LOG OUT ROUTE
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
    console.log("you have logged out");
});

// new route
app.get("/emex/signup", function(req, res){
    res.redirect("/emex");
});



// edit route
app.get("/emex/:id/edit", function(req, res){
    res.send("edit route");
});

// update route
app.put("/emex/:id", function(req, res){
    res.send("update route");
});

// destroy route
app.delete("/emex", function(req, res){
    res.send("update route");
});

app.get("/secret", function(req, res){
    res.render("secret");
})



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login")
}

app.listen(3000, function(){
    console.log("API DON START");
})

