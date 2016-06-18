var Request = require('./requestSchema');

exports.postRequest = function (req, res) {
  var request = new Request(req.body);

  request.save(function (err, m) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).json(m);
  });
};

