var mongoose = require('mongoose');

var agencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Agency', agencySchema);;
