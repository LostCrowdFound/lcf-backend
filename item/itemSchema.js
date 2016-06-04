var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    type: String,
    brand: String,
    name: String,
    date: Date,
    email: String,
    lat: String,
    lon: String,
    radius: Number //in meters?
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
