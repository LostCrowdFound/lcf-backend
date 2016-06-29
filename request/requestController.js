var Request = require('./requestSchema');
var User = require('../user/userSchema');
var Item = require('../item/itemSchema');
var nodemailer = require('nodemailer');
var EmailTemplates = require('swig-email-templates');
var path = require('path');

var transporter = nodemailer.createTransport
  ('smtps://lostcrowdfound%40gmail.com:lostcrowdfoundpw12@smtp.gmail.com');

var templates = new EmailTemplates({
  root: path.join(__dirname, 'templates'),
});

exports.postRequest = function (req, res) {

  var request = new Request(req.body);

  request.save(function (err, request) {
    if (err) {
      return res.status(500).send(err);
    }

    User.findById(request.comments[0].userId, function (err, user) {
      Item.findById(request.itemId)
        .populate('userId')
        .exec(function (err, item) {

            console.log(item.currentUserRequests.indexOf(user._id));

            if (item.currentUserRequests.indexOf(user._id) > -1
              || item.dismissedUser.indexOf(user._id) > -1) {

              console.log('Removing request...');
              Request.remove({ id: request._id }, function (err) {
                if (err) {
                  return res.status(500).send(err);
                }

                return res.status(403).send('Request already open or dismissed!');
              });
            } else {

              Item.findByIdAndUpdate(item._id, { $push: { currentUserRequests: user._id } }, function (err) {
                if (err) {
                  return res.status(500).send(err);
                }

                var context = {
                  finderName: item.userId.username,
                  loserName: ' ' + user.username,
                  loserEmail: user.email,
                  resolveUrl: 'http://localhost:9000/#/resolveRequest/' + request._id,
                  dismissUrl: 'http://localhost:9000/#/dismissRequest/' + request._id,
                  description: request.comments[0].text,
                };

                templates.render('emailtemplate.html', context,
                    function (err, html, text) {

                    // Send email
                    transporter.sendMail({
                        from: '"LostCrowdFound" <lostcrowdfound@googlemail.com>', // sender address
                        to: item.userId.email, // list of receivers
                        subject: 'You have a new Request for an item you found!', // Subject line
                        html: html, // html body
                        text: text,
                      });
                  });

                res.status(201).json(request);
              });
            }
          });
    });
  });
};

exports.resolveRequest = function (req, res) {
    var requestId = req.params.request_id;
    var userId = req.query.userId;

    Request.findById(requestId, function (err, request) {
      Item.findById(request.itemId, function (err, item) {
        if (item.userId === userId) {
          //resolve
          Request.findByIdAndUpdate(requestId, { $set: { status: 'resolved' } }, function (err, request) {
            if (err) {
              return res.status(500).send(err);
            }

            Item.findByIdAndUpdate(item._id, { $set: { resolvedUser: userId } }, function (err, item) {
              if (err) {
                return res.status(500).send(err);
              }
            });

            res.sendStatus(204);
          });
        }
      });
    });
  };

exports.dismissRequest = function (req, res) {
    var requestId = req.params.request_id;

  };
