var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
    date: Date,
    text: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    itemId: { type: mongoose.Schema.ObjectId, ref: 'Item' },
    status: String,
  });

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
