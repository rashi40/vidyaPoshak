var Campground = require("../models/stories");
var Comment = require("../models/updates");
var middlewareObj = {};

// middlewareObj.checkCampgroundOwnership = function(req, res, next){
// 	if(req.isAuthenticated()){
// 	Campground.findById(req.params.id,  function(err, foundCampground){
// 		if(err){
// 			res.redirect("back");
// 		}
// 		else {
		
// 			if(foundCampground.author.id.equals(req.user._id)){
// 				next();
// 			}
// 			else {
// 				req.flash("error", "You don't have permission to do that");
// 				res.redirect("back");
// 			}
// 		}
// 	});
// 	}
// 	else{
// 		req.flash("error", "You need to be logged in to do that");
// 		res.redirect("back");
// 	}
// }

// middlewareObj.checkCommentOwnership = function(req, res, next){
// 	if(req.isAuthenticated()){
// 	Comment.findById(req.params.comment_id,  function(err, foundComment){
// 		if(err){
// 			res.redirect("back");
// 		}
// 		else {
// 		    console.log(req.user._id);
// 			console.log(foundComment);
// 			if(foundComment.author.id.equals(req.user._id)){
// 				next();
// 			}
// 			else {
// 				req.flash("error", "You don't have permission to do that");
// 				res.redirect("back");
// 			}
// 		}
// 	});
// 	}
// 	else{
// 		req.flash("error", "You need to be logged in to do that");
// 		res.redirect("back");
// 	}
// }

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		if( req.user.isAdmin)
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;