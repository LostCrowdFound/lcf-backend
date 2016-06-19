var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  type: String,
  brand: String,
  name: String,
  date: Date,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  lat: Number,
  lon: Number,
  status: String,
  resolvedUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
  dismissedUser: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  currentUserRequests: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
