var mongoose = require('mongoose');

var latestUpdates = new mongoose.Schema({
	 img: 
  { data: Buffer, contentType: String },
	name: String,
	description: String
});

module.exports = mongoose.model("Updates", latestUpdates);