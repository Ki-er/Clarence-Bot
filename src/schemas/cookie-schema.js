const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const cookieSchema = new mongoose.Schema({
	receiverId: reqString,
	giverId: reqString,
	reason: reqString,
	guildId: reqString,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('cookie', cookieSchema);
