var mongoose = require('mongoose');

// http://g00glen00b.be/mean-mvc/
module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.on('error', function() {
    throw new Error('Unable to connect to database at ' + config.db);
  });
};