var Request = require('./requestSchema');
var User = require('../user/userSchema');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport
  ('smtps://lostcrowdfound%40gmail.com:lostcrowdfoundpw12@smtp.gmail.com');

exports.postRequest = function (req, res) {
  var request = new Request(req.body);

  request.save(function (err, m) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    console.log('Request saved.');

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"LostCrowdFound" <lostcrowdfound@googlemail.com>', // sender address
      to: req.body.user, // list of receivers
      subject: 'You have a new Request for an item you found!', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }

      console.log('Message sent: ' + info.response);
    });

    res.status(201).json(m);
  });
};
