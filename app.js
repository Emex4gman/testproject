var express         = require("express")
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override");


//DATABABSE CONFIG
mongoose.connect("mongodb://localhost/emexapi",  {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");


//MONGOOSE CONFIG
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model("User", UserSchema);

//SEED USER
// User.create({
//     username: "emex",
//     password: "emex",
// });


app.get("/", function(req, res){
        res.send("homepage");
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



// show route
app.get("/emex/:id", function(req, res){
    res.send("show route");
});

// new route
app.get("/emex/new", function(req, res){
    res.send("new route");
});

// create route 
app.post("/emex", function(req, res){
    var username = req.body.username;
    var password =  req.body.password;
    var newUser = { username: username, password: password};

    User.create(newUser, function(err, newlyUser){
        if(err){
            console.log(err);
        } else{
            // newlyUser.save();
            res.redirect("/emex")
        }
    });
    
});

// edit route
app.get("/emex/:id/edit", function(req, res){
    res.send("edit route");
});

// update route
app.put("/emex", function(req, res){
    res.send("update route");
});

// destroy route
app.delete("/emex", function(req, res){
    res.send("update route");
});







app.listen(3000, function(){
    console.log("API DON START");
})

