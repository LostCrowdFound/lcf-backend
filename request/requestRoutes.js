module.exports = requestRoutes;

function requestRoutes(passport) {

  var requestController = require('./requestController');
  var router = require('express').Router();
  var unless = require('express-unless');

  var mw = passport.authenticate('jwt', { session: false });
  mw.unless = unless;

  //middleware
  router.use(mw.unless({ method: ['OPTIONS'] }));

  router.route('/requests')
      .post(requestController.postRequest)
      .get(requestController.getRequest);

  router.route('/requests/:request_id')
      .get(requestController.getRequest);

  return router;
}
