var mongoose = require('mongoose');

var adSchema = mongoose.Schema({
  type: String,
  date: Date,
  imgPath: String,
  status: String
});

var Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
