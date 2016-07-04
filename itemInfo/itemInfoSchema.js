var mongoose = require('mongoose');

var itemInfoSchema = mongoose.Schema({
  type: {
      type: String,
      unique: true,
    },
  brands: [{ brand:  String, models: [String] }],
});

var itemInfo = mongoose.model('itemInfo', itemInfoSchema);

module.exports = itemInfo;
