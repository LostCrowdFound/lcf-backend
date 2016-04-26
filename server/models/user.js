var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
		name: {type: String, required: true},
		email: {type: String, required: true}
});

var model = mongoose.model('user', user);
module.exports = model;