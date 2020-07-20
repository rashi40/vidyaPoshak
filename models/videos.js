var mongoose = require('mongoose');

var VideoPageSchema = new mongoose.Schema({
	videoUrl: {
		type: String,
		required: true,
		unique: true
	},
	videoName: String
});

module.exports = mongoose.model("Video", VideoPageSchema);