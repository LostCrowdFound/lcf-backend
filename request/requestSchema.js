var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
    comments: [
      {
        date: Date,
        status: String,
        text: String,
        userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
    itemId: { type: mongoose.Schema.ObjectId, ref: 'Item' },
  });

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
