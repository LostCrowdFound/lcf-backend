var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
  */

app.listen(Config.app.port);

console.log('Server listening on port: '+ Config.app.port);
