
var Request = require('./requestSchema');
var User = require('../user/userSchema');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport
  ('smtps://lostcrowdfound%40gmail.com:lostcrowdfoundpw12@smtp.gmail.com');

exports.postRequest = function (req, res) {

  console.log(req.body);

  var request = new Request(req.body);

  console.log(request);

  request.save(function (err, m) {
    if (err) {
      return res.status(500).send(err);
    }

  //  User.findById(request.comments[0].userId, function (err, user) {

    var mailOptions = {
      from: '"LostCrowdFound" <lostcrowdfound@googlemail.com>', // sender address
      to: '"Sönke Erfkamp" <soenke.erfkamp@tum.de>', // list of receivers
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
