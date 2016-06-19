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

  console.log(request);
  request.save(function (err, request) {
    if (err) {
      return res.status(500).send(err);
    }

    User.findById(request.comments[0].userId, function (err, user) {
      Item.findById(request.itemId)
        .populate('userId')
        .exec(function (err, item) {

          console.log(item);

          var context = {
            finderName: 'Peter',
            loserName: user.username,
            loserEmail: 'soenke.erfkamp@web.de',
            resolveUrl: '',
            dismissUrl: '',
            description: request.comments[0].text,
          };

          templates.render('emailtemplate.html', context,
              function (err, html, text) {

              // Send email
              transporter.sendMail({
                  from: '"LostCrowdFound" <lostcrowdfound@googlemail.com>', // sender address
                  to: user.email, // list of receivers
                  subject: 'You have a new Request for an item you found!', // Subject line
                  html: html, // html body
                  text: text,
                });
            });

          res.status(201).json(request);
        });
    });
  });
};
