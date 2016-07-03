var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

module.exports.login = function (req, res) {
  console.log('Trying to log in user: ' + req.body.username + 'pw:' + req.body.password);

  if (!req.body.username) {
    return res.status(400).send('username required');
  }

  if (!req.body.password) {
    return res.status(400).send('password required');
  }

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      res.status(400).send('Invalid Credentials');
      return;
    }

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch || err) {
        res.status(401).send('Invalid Credentials');
      } else {
        console.log('Password matches!');
        res.status(200).json({
          token: createToken(user),
          userId: user._id,
        });
        console.log('User ID: ' + user._id);
      }
    });
  });

};

module.exports.signup = function (req, res) {
  console.log('Trying to sign up user: ' + req.body.username);
  if (!req.body.username) {
    return res.status(400).send('username required');
  }

  if (!req.body.password) {
    return res.status(400).send('password required');
  }

  User.findOne({ username: req.body.username }, function (err, resUser) {

    if (err) {
      return res.status(500).send(err);
    }

    if (resUser) {
      return res.status(401).send('Username already taken!');
    } else {
      var user = new User();

      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;

      user.save(function (err) {
        if (err) {
          res.status(500).send(err);
          return;
        }

        res.status(201).json(); //{token: createToken(user)}
      });
    }
  });
};

module.exports.unregister = function (req, res) {
  req.user.remove().then(function (user) {
    res.sendStatus(200); },

    function (err) {
      res.status(500).send(err);
    });
};

function createToken(user) {
  var tokenPayload = {
    user: {
      _id: user._id,
      username: user.username,
    },
  };
  return jwt.encode(tokenPayload, Config.auth.jwtSecret);
}
