var Search = require('./searchSchema');

exports.postSearch = function (req, res) {
  var search = new Search(req.body);

  search.save(function (err, m) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).json(m);
  });
};
