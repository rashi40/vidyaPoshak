var express  = require('express');
var User = require("../models/user");
var middleware = require("../middleware");
var router = express.Router();

router.get("/admin", middleware.isLoggedIn, function(req, res){
	User.find({}, function(err, user){
		if(err){
			req.flash("error", err.message);
		}
		else{	
	     res.render("user", {user:user});	
		}
	});

});

router.delete("/admin/:user_id",  middleware.isLoggedIn, function(req, res){
	User.findByIdAndRemove(req.params.user_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/admin");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/admin");
		}
	});
});

module.exports = router;