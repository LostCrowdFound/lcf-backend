var Config = require('./config/config');
var databaseSeed = require('./config/databaseSeed');
var User = require('./user/userSchema');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''), {
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass,
  }, function () {

    //TO DO : DROP DATABASE

    User.create(databaseSeed.users, function (err, users) {
      // users returns an array of the created user.
      // Need to use that to create items since we need the reference.

      // Items.create
          // Request create usw..
    });
  }
);

/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);


/**
 * routing
 */

var userRoutes = require("./user/userRoutes");
var itemRoutes = require("./item/itemRoutes");
var requestRoutes = require("./request/requestRoutes");

app.use('/api', itemRoutes(passport));
app.use('/', userRoutes(passport));
app.use('/api', requestRoutes(passport));

module.exports = app;
