var express    =   require('express');
var router     =   express.Router();
var Campground =   require("../models/stories");
var Comment    =   require("../models/updates");
var middleware = require("../middleware");
var passport   =   require("passport");
var User       =   require("../models/user");

router.get("/",function(req,res) {
   	res.render("landing");
});

router.get("/aboutus", function(req, res){
   res.render("about");	
});

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register",  function(req, res){
	var newUser = new User({username:req.body.username});
	  if(req.body.adminCode === 'Secretcode123*') {
      newUser.isAdmin = true;
	  }
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
		  return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome  "+user.username);
			res.redirect("/");
		});
	});
});

//============
// ROUTES POST

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local",
										{
	successRedirect: "/",
	failureRedirect: "/login"
}), function(req, res){
	
});

router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("success", "Logged you out !");
	res.redirect("/");
});

router.get("/volunteerUs", function(req, res){
	res.render("volunteer");
});

router.get("/memberOfAlumni", function(req, res){
	res.render("alumni");
});

router.get("/financialAssistanceProgram", function(req, res){
	res.render("financialAssistance");
});

router.get("/residentialBridgeCamps", function(req, res){
	res.render("bridgeCamps");
});

router.get("/libraryServices", function(req, res){
	res.render("libraryServices");
});

router.get("/employmentReadinessProgram", function(req, res){
	res.render("employmentReadiness");
});

router.get("/abdulKalamSusandhiFellowshipProgram", function(req, res){
	res.render("eklakshya");
});

router.get("/eVidyaloka", function(req, res){
	res.render("evidyaloka");
});

router.get("/knowledgeResourceCenters", function(req, res){
	res.render("knowledgeResource");
});

router.get("/contactUs", function(req, res){
	res.render("contact");
});

module.exports = router;
