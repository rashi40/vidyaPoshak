var mongoose = require('mongoose');

var auditSchema = new mongoose.Schema({
	 pdf: 
  { data: Buffer, contentType: String },
    name: String
});

module.exports = mongoose.model("audit", auditSchema);