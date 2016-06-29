module.exports = itemInfoRoutes;

function itemInfoRoutes(passport) {

  var itemInfoController = require('./itemInfoController');
  var router = require('express').Router();
  var unless = require('express-unless');

  var mw = passport.authenticate('jwt', { session: false });
  mw.unless = unless;

  //middleware
  router.use(mw.unless({ method: ['OPTIONS'] }));

  router.route('/itemInfo')
      .get(itemInfoController.getItemInfo);

  return router;
}