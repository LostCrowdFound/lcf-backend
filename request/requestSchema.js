var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  type: String,
  brand: String,
  name: String,
  date: Date,
  email: String,
  lat: Number,
  lon: Number,
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;

{
  date
  comments: [
    {
      date
      status
      text
      user
    }
  ]
}
