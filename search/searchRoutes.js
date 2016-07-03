module.exports = searchRoutes;

function searchRoutes(passport) {

  var searchController = require('./searchController');
  var router = require('express').Router();
  var unless = require('express-unless');

  var mw = passport.authenticate('jwt', { session: false });
  mw.unless = unless;

  //middleware
  router.use(mw.unless({ method: ['OPTIONS'] }));

  router.route('/searchs')
      .post(searchController.postSearch);

  return router;
}
