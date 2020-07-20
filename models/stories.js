var mongoose = require('mongoose');

var successStories = new mongoose.Schema({
	 img: 
  { data: Buffer, contentType: String }
 ,
	name: String
});

module.exports = mongoose.model("Stories", successStories);