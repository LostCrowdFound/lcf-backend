const Item = require('./itemSchema');
const csv = require('csv-streamify');
const stream = require('stream');

exports.postItem = function (req, res) {
  const item = new Item(req.body);

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

      res.status(200).json(filteredItems);
    }
  );
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function (req, res) {
  Item.findById(req.params.item_id, function (err, item) {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).json(item);
  });
};

// Create endpoint /api/items/import for POST
exports.postImport = function (req, res) {
  if (!req.file || req.file.fieldname !== 'csv-file') {
    res.sendStatus(400);
    return;
  }

  const parser = csv({ objectMode: true }, function (err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    // our csv has been parsed succesfully
    let items = [];
    let failed = [];

    result.forEach(function (o) {
      if (o.length !== 6) {
        // skip incomplete lines
        failed.push(o.join(','));
        return;
      }

      if (o[0] === 'type') {
        return; // skip header
      }

      try {
        // try to parse strings
        let date = new Date(o[3]);
        let lat = Number(o[4]);
        let lon = Number(o[5]);

        // validate
        if (isNaN(date.getTime()) || isNaN(lat) || isNaN(lon)) {
          ailed.push(o.join(','));
          return;
        }

        // form item object
        items.push({
          type: o[0],
          brand: o[1],
          name: o[2],
          date: date,
          userId: req.user._id,
          lat: lat,
          lon: lon,
          status: 'open',
        });
      } catch (up) {
        failed.push(o.join(','));
        return;
      }
    });

    // return invalid lines
    if (failed.length > 0) {
      res.status(500).json(failed);
      return;
    }

    Item.collection.insert(items);
    res.sendStatus(200);
  });

  // buffer to stream
  let bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);
  bufferStream.pipe(parser);
};
