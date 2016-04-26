var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
		title: {type: String, required: true},
		description: {type: String, required: true},
		itemType: {type: String, required: true},
		brand: {type: String, required: true},
		locLat: {type: String, required: true},
		locLon: {type: String, required: true},
		date: {type: Date, default: Date.now }
});

var model = mongoose.model('item', item);
module.exports = model;