var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
	 pdf: 
  { data: Buffer, contentType: String },
    name: String
});

module.exports = mongoose.model("Document", documentSchema);