var Ad = require('./adSchema');

exports.postAd = function (req, res) {
  let raw = req.body;
  if (!raw.header || !raw.body || !raw.target || !raw.keywords ||
      raw.header.length < 1 || raw.body.length < 1 ||
      raw.target.length < 1 || raw.keywords.length < 1) {
    res.sendStatus(400);
    return;
  }

  // split keyword list to array
  raw.keywords = raw.keywords.split(',').map(function (s) { return s.trim(); });

  // add http prefix if necessary
  if (raw.target.slice(0, 4) !== 'http') {
    raw.target = 'http://' + raw.target;
  }

  var ad = new Ad({
    type: 'text',
    header: raw.header,
    body: raw.body,
    target: raw.target,
    keywords: raw.keywords,
    owner: req.user._id,
    views: 0,
    status: 'new',
  });

  ad.save(function (err, ad) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).json(ad);
  });
};

// Create endpoint /api/ads for GET
exports.getAds = function (req, res) {
  Ad.find({
    keywords: { $in: [
      req.query.type,
      req.query.brand,
      req.query.name,
    ], },
  }, function (err, ads) {
      if (err) {
        return res.status(500).send(err);
      }

      //console.log('Returning ads:', filteredAds);
      res.status(200).json(filteredAds);
    }
  );
};

// Create endpoint /api/ads/:ad_id for GET
exports.getAd = function (req, res) {
  Ad.findById(req.params.ad_id, function (err, ad) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(ad);
  });
};
