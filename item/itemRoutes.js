module.exports = itemRoutes;

function itemRoutes(passport) {

  var itemController = require('./itemController');
  var router = require('express').Router();
  var unless = require('express-unless');

  var mw = passport.authenticate('jwt', { session: false });
  mw.unless = unless;

  //middleware
  router.use(mw.unless({ method: ['OPTIONS'] }));

  router.route('/items')
      .post(itemController.postItem)
      .get(itemController.getItems);

  router.route('/items/:item_id')
      .get(itemController.getItem);

  return router;
}
