var connect = require('connect');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');

module.exports = function(app, config) {
    app.use(compression());
    app.set('port', config.port);
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + "/../client"));
};