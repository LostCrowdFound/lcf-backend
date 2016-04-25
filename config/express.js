var connect = require('connect');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override')


module.exports = function(app, config) {
    app.use(compression());
    app.set('port', config.port);
    //app.use(express.logger('dev'));
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(methodOverride('X-HTTP-Method-Override'));
    
    //app.use('/api', app.router);
    app.use('/', express.static(__dirname + "/../client"));
};