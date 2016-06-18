var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
  comments: [{
  	date: Date,
  	status: String,
  	text: String,
  	userMail: String
  	}],
   itemId: { 
   type: mongoose.Schema.ObjectId, 
   ref : 'item'
   },
});

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
