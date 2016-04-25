var userController = require('../server/controllers/user.controller');
var itemController = require('../server/controllers/item.controller');
var requestController = require('../server/controllers/request.controller');

module.exports = function(app){
  app.get('/users', userController.findAll);  
  app.get('/users/:id', userController.findOne);  
  app.post('/users', userController.add);  
  //app.put('/users/:id', userController.update);  
  app.delete('/users/:id', userController.remove);

  app.get('/items', itemController.findAll);
  app.get('/items/:id', itemController.findOne);
  app.post('/items', itemController.add);
  //app.put('/items/:id', itemController.update);  
  app.delete('/items/:id', itemController.remove);

  app.get('/requests', requestController.findAll);
  app.get('/requests/:id', requestController.findOne);
  app.post('/requests', requestController.add);
  //app.put('/requests/:id', requestController.update);
  app.delete('/requests/:id', requestController.remove);
};