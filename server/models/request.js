var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var request = new Schema({
		title: {type: String, required: true},
		description: {type: String, required: true},
		item: {type: Schema.Types.ObjectId, ref: 'item'},
		description: {type: String, required: true},
		//date: {type: Date, default: Date.now }
});

var model = mongoose.model('request', request);
module.exports = model;