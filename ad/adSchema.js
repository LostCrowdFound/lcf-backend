var mongoose = require('mongoose');

var adSchema = mongoose.Schema({
  type: String,
  header: String,
  body: String,
  target: String,
  keywords: [String],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  views: Number,
  status: String,
});

var Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
