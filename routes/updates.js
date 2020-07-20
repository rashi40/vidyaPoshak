var express  = require('express');
var multer  = require('multer');
var Updates = require("../models/updates");
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
		cb(error);
	}
}

// router.get("/successStories", function(req, res){
// 	res.send("stories are here");
// });

router.get("/latestUpdates", function(req, res){
	Updates.find({}, function(err, update){
		if(err){
			console.log("ERROR");
		}
		else{	
	     res.render("updates", {update:update});	
		}
	});

});

router.get("/latestUpdates/new", middleware.isLoggedIn, function(req, res){
	res.render("newUpdates");
});

router.post("/latestUpdates", upload.single('userPhoto'),  middleware.isLoggedIn, function(req, res){
	// req.body.Updates.body = req.sanitize(req.body.Updates.body);
	// Updates.create(req.body.Updates, function(err, update){
	// 	if(err){
	// 		req.flash("error", err.message);
	// 		res.render("updates");
	// 	}
	// 	else{
	// 		req.flash("success","Successfully Updated!");
	// 		res.redirect("/latestUpdates");
	// 	}
	// });
	console.log(req.file.filename);
	var obj = { 
        name: req.body.name, 
		description: req.body.description,
        img: { 
            data: fs.readFileSync(path.join( 'public/resources/stories/' + req.file.filename)), 
            contentType: req.file.contentType,
        } 
    } 
    Updates.create(obj, (err, item) => { 
        if (err) { 
            req.flash("error", err.message);
		    res.redirect('/latestUpdates'); 
        } 
        else { 
            // item.save();
			req.flash("success","Successfully posted!");
            res.redirect('/latestUpdates'); 
        } 
    }); 
});

router.delete("/latestUpdates/:update_id", middleware.isLoggedIn, function(req, res){
	Updates.findByIdAndRemove(req.params.update_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/latestUpdates");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/latestUpdates");
		}
	});
});

router.get("/latestUpdates/:id",function(req, res) {
	Updates.findById(req.params.id).exec(function(err,foundUpdate) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("updatesIndex",{update:foundUpdate});
		}
	});
	
});

module.exports = router;