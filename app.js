var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var config  = require('./config/config');

require('./config/db')(config);

var app = express();

var modelsPath = __dirname + '/server/models';
require(modelsPath + '/item');
require(modelsPath + '/user');
require(modelsPath + '/request');

require('./config/express')(app, config);
require('./config/routes')(app);

app.use('/api', require('./config/routes'));

app.listen(config.port, config.host);
 
//var server = http.createServer(app);
//server.listen(config.port, config.host);

console.log('App started on port '+ config.port);

module.exports = app;