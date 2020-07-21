var express  = require('express');
var multer  = require('multer');
var Stories = require("../models/stories");
var middleware = require("../middleware");
var fs = require("fs");
var path = require("path");
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resources/stories');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ 
      storage: storage,
      limits: {fileSize: 1000000},
      fileFilter: function(req, file, cb){
		  checkFileType(file,cb);
	  }});

function checkFileType(file, cb){
	var filetypes = /jpeg|jpg|png|gif/;
	var extname   = filetypes.test(path.extname(file.originalname).toLowerCase());
	var mimetype  = filetypes.test(file.mimetype);
	if(mimetype && extname){
		return cb(null, true);
	}
	else {
		cb("only .png .jpg .jpeg .gif allowed");
	}
}

router.get("/successStories", function(req, res){
	Stories.find({}, function(err, story){
		if(err){
			req.flash("error", err.message);
		}
		else{	
	     res.render("stories", {story:story});	
		}
	});

});

router.get("/successStories/new",  middleware.isLoggedIn, function(req, res){
	res.render("newStories");
});

router.post("/successStories", upload.single('userPhoto'),  middleware.isLoggedIn, function(req, res){
// 	req.body.Stories.name = req.sanitize(req.body.Stories.name);
// 	var file = req.body.Stories.files;
	 
// req.body.Stories.img.data = fs.readFileSync(req.Stories.files.userPhoto.path);
// req.body.Stories.img.contentType = file.filename;

// 	Stories.create(req.body.Stories, function(err, newStory){
// 		if(err){
// 			res.render("newStories");
// 		}
// 		else{
// 			res.redirect("/successStories");
// 		}
// 	});
	// upload(req, res, (err)=>{
	// 	if(err){
	// 		console.log(err);
	// 		res.redirect("/successStories/new");
	// 	}
	// 	else{
	// 		console.log(req.file);
	// 		res.redirect("/successStories");
	// 	}
	// })
	var obj = { 
        name: req.body.name, 
        img: { 
            data: fs.readFileSync(path.join( 'public/resources/stories/' + req.file.filename)), 
            contentType: req.file.contentType,
        } 
    } 
    Stories.create(obj, (err, item) => { 
        if (err) { 
            req.flash("error", err.message);
		    res.redirect('/successStories'); 
        } 
        else { 
            // item.save();
			req.flash("success","Successfully posted!");
            res.redirect('/successStories'); 
        } 
    }); 
});

router.delete("/successStories/:story_id",  middleware.isLoggedIn, function(req, res){
	Stories.findByIdAndRemove(req.params.story_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/successStories");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/successStories");
		}
	});
});

module.exports = router;