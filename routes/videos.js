var express  = require('express');
var Video = require("../models/videos");
var middleware = require("../middleware");
var router = express.Router();

router.get("/achievements_videos/new", function(req, res){
	res.render("newVideo");
});

router.post("/achievements_videos", middleware.isLoggedIn, function(req, res){
	req.body.Video.body = req.sanitize(req.body.Video.body);
	Video.create(req.body.Video, function(err, newVideo){
		if(err){
			req.flash("error", err.message);
			res.render("newVideo");
		}
		else{
			req.flash("success","Successfully posted!");
			res.redirect("/achievements_videos");
		}
	});
});

router.delete("/achievements_videos/:video_id", middleware.isLoggedIn, function(req, res){
	Video.findByIdAndRemove(req.params.video_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/achievements_videos");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/achievements_videos");
		}
	});
});

module.exports = router;