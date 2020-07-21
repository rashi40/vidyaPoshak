var express  = require('express');
var multer  = require('multer');
var Documents = require("../models/documents");
var Audit = require("../models/audit");
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
	var filetypes = /pdf/;
	var extname   = filetypes.test(path.extname(file.originalname).toLowerCase());
	var mimetype  = filetypes.test(file.mimetype);
	if(mimetype && extname){
		return cb(null, true);
	}
	else {
		cb("only pdfs are allowed");
	}
}

router.get("/documents", function(req, res){
	Documents.find({}, function(err, doc){
		if(err){
			req.flash("error", err.message);
		}
		else{	
			Audit.find({}, function(err, aud){
		if(err){
			req.flash("error", err.message);
		}
				else{
	     res.render("documents", {doc:doc, aud:aud});
				}
			});
		}
	});

});

router.get("/documents/new",  middleware.isLoggedIn, function(req, res){
	res.render("newDocuments");
});

router.get("/documents/audit/new", middleware.isLoggedIn, function(req, res){
	res.render("newAudit");
});

router.post("/documents", upload.single('userPhoto'),  middleware.isLoggedIn, function(req, res){

	var obj = { 
        name: req.body.name, 
        pdf: { 
            data: fs.readFileSync(path.join( 'public/resources/stories/' + req.file.filename)), 
            contentType: req.file.contentType,
        } 
    } 
    Documents.create(obj, (err, item) => { 
        if (err) { 
            req.flash("error", err.message);
		    res.redirect('/documents'); 
        } 
        else { 
            // item.save();
			req.flash("success","Successfully posted!");
            res.redirect('/documents'); 
        } 
    }); 
});

router.post("/auditDocuments", upload.single('userPhoto'), middleware.isLoggedIn, function(req, res){

	var obj = { 
        name: req.body.name, 
        pdf: { 
            data: fs.readFileSync(path.join( 'public/resources/stories/' + req.file.filename)), 
            contentType: req.file.contentType,
        } 
    } 
   Audit.create(obj, (err, item) => { 
        if (err) { 
            req.flash("error", err.message);
		    res.redirect('/documents'); 
        } 
        else { 
            // item.save();
			req.flash("success","Successfully posted!");
            res.redirect('/documents'); 
        } 
    }); 
});

router.delete("/documents/:doc_id",  middleware.isLoggedIn, function(req, res){
	Documents.findByIdAndRemove(req.params.doc_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/documents");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/documents");
		}
	});
});

router.delete("/auditDocuments/:doc_id", middleware.isLoggedIn,  function(req, res){
	Audit.findByIdAndRemove(req.params.doc_id, function(err){
		if(err){
			req.flash("error", err.message);
			res.redirect("/documents");
		}
		else {
			req.flash("success","Successfully deleted!");
			res.redirect("/documents");
		}
	});
});

module.exports = router;