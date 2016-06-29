var mongoose = require('mongoose');

var itemInfoSchema = mongoose.Schema({
	type: String,
	brands: [{brand:  String, models: [String]}]	
});

var itemInfo = mongoose.model('itemInfo', itemInfoSchema);

module.exports = itemInfo;