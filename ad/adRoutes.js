module.exports = adRoutes;

function adRoutes(passport) {

  var adController = require('./adController');
  var router = require('express').Router();
  var unless = require('express-unless');

  var mw = passport.authenticate('jwt', { session: false });
  mw.unless = unless;

  //middleware
  router.use(mw.unless({ method: ['OPTIONS'] }));

  router.route('/ads')
      .post(adController.postAd)
      .get(adController.getAds);

  router.route('/ads/:ad_id')
      .get(adController.getAd);

  return router;
}
