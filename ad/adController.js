var Ad = require('./adSchema');

exports.postAd = function (req, res) {
  var ad = new Ad(req.body);

  ad.save(function (err, m) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).json(m);
  });
};

// Create endpoint /api/ads for GET
exports.getAds = function (req, res) {
  Ad.find({
    type: req.query.type,
    brand: req.query.brand,
    name: req.query.name,
  }, '_id lat lon', function (err, ads) {
      if (err) {
        return res.status(500).send(err);
      }
//console.log('Returning ads: ' + filteredAds);
      res.status(200).json(filteredAds);
    }
  );
};

// Create endpoint /api/ads/:ad_id for GET
exports.getAd = function (req, res) {

  Ad.findById(req.params.ad_id, 'email', function (err, ad) {
    if (err) {
      return res.status(500).send(err);
    };

    res.json(ad);
  });
};
