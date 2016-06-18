module.exports = requestRoutes;

function requestRoutes(passport) {

  var requestController = require('./requestController');
  var router = require('express').Router();

  router.post('/', requestController.create);
  router.put('/', passport.authenticate('jwt', { session: false }),
    requestController.unregister);

  return router;

}
