var Item = require('./itemSchema');

exports.postItem = function (req, res) {
  var item = new Item(req.body);

  item.status = 'open';

  item.save(function (err, m) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).json(m);
  });
};

//http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function isPointInRadius(item, query) {
  var distanceInkm = getDistanceFromLatLonInKm(this.lat, this.lon, item.lat, item.lon);
  if (distanceInkm < this.radius / 1000) {
    return true;
  }
}

// Create endpoint /api/items for GET
exports.getItems = function (req, res) {
  Item.find({
    type: req.query.type,
    brand: req.query.brand,
    name: req.query.name,
    date: { $gte: req.query.date },
    status: 'open',
  }, '_id lat lon', function (err, items) {
      if (err) {
        return res.status(500).send(err);
      }

      var filteredItems = items.filter(isPointInRadius, req.query);

      console.log('Returning items: ' + filteredItems);
      res.status(200).json(filteredItems);
    }
  );
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function (req, res) {
  // if (!req.user.equals(movie.user)) {
  //       res.sendStatus(401);
  // }

  Item.findById(req.params.item_id, function (err, item) {
    if (err) {
      return res.status(500).send(err);
    };

    res.status(201).json(item);
  });
};
