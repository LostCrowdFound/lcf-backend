var mongoose = require('mongoose');

var searchSchema = mongoose.Schema({
  type: String,
  brand: String,
  name: String,
  radius: Number,
  date: Date,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  lat: Number,
  lon: Number,
});

var Search = mongoose.model('Search', searchSchema);

module.exports = Search;
