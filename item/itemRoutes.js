module.exports = itemRoutes;

var multer  = require('multer');
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 64 * 1024,
  },
});

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

  router.route('/items/import')
      .post(upload.single('csv-file'), itemController.postImport);

  return router;
}
