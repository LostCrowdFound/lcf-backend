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

// Create endpoint /api/items for GET
exports.getRequests = function (req, res) {
  Request.find({
    type: req.query.type,
    brand: req.query.brand,
    name: req.query.name,
    date: { $gt: req.query.date },
  }, '_id lat lon', function (err, items) {
      if (err) {
        return res.status(500).send(err);
      }

      var filteredItems = items.filter(isPointInRadius, req.query);

      console.log('Returning items: ' + items);
      res.status(200).json(filteredItems);
    }
  );
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function (req, res) {
  // if (!req.user.equals(movie.user)) {
  //       res.sendStatus(401);
  // }

  Item.findById(req.params.item_id, 'email', function (err, item) {
    if (err) {
      return res.status(500).send(err);
    };

    res.json(item);
  });
};
