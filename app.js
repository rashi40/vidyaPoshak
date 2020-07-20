var express           = require('express'),
    expressSanitizer  = require("express-sanitizer"),
    methodOverride    = require("method-override"),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
	User              = require("./models/user"),
    storiesRoutes     = require("./routes/stories"),
    updatesRoutes     = require("./routes/updates"),
	indexRoutes       = require("./routes/index"),
	flash             = require("connect-flash"),
	passport          = require("passport"),
	path              = require("path"),
	LocalStrategy     = require("passport-local"),
    app               = express();


app.use(bodyParser.urlencoded({extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/stylesheets"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost:27017/vidyaPoshak_db",{useNewUrlParser:true});

app.use(require("express-session")({
	secret : "I sing Indina Menzel songs .",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

Stories =  require("./models/stories");
Updates = require("./models/updates");
Video = require("./models/videos");

app.use(storiesRoutes);
app.use(updatesRoutes);
app.use(indexRoutes);

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/aboutus", function(req, res){
   res.render("about");	
});

app.get("/achievements_videos", function(req, res){
	Video.find({}, function(err, video){
		if(err){
			console.log("ERROR");
		}
		else{	
	     res.render("videos", {video:video});	
		}
	});

});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(process.env.PORT || 3000);