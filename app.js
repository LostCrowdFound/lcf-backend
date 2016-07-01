var Config = require('./config/config');
var databaseSeed = require('./config/databaseSeed');
var User = require('./user/userSchema');
var Item = require('./item/itemSchema');
var ItemInfo = require('./itemInfo/itemInfoSchema');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''), {
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass,
  }, function () {

    if (Config.seedDB) {
      mongoose.connection.db.dropDatabase(function (err) {
        ItemInfo.create(databaseSeed.itemInfo, function (err, itemInfo) {
          if (err) return err;
        });

        User.create(databaseSeed.users, function (err, users) {
          if (err) return err;
          Item.create(databaseSeed.items, function (err, items) {
            for (var i = 0; i < databaseSeed.items.length; i++) {
              var randomUserIndex = Math.floor((Math.random() * databaseSeed.users.length));
              Item.findByIdAndUpdate(items[i]._id, { $set: { userId: users[randomUserIndex] } },
                function (err, item) {
                if (err) return err;
              });
            }
          });
        });
      });
    }
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
  extended: true,
}));

//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);

/**
 * routing
 */

var userRoutes = require('./user/userRoutes');
var itemRoutes = require('./item/itemRoutes');
var requestRoutes = require('./request/requestRoutes');
var adRoutes = require('./ad/adRoutes');
var itemInfoRoutes = require('./itemInfo/itemInfoRoutes');

app.use('/api', itemRoutes(passport));
app.use('/', userRoutes(passport));
app.use('/api', requestRoutes(passport));
app.use('/api', adRoutes(passport));
app.use('/api', itemInfoRoutes(passport));

module.exports = app;
