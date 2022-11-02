const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const userSchema = new mongoose.Schema({
	_id: reqString,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);