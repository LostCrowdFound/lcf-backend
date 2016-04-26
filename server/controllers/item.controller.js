var mongoose = require('mongoose');
var item = mongoose.model('item');

exports.findAll = function(req, res) {
	item.find(function(err, items) {
		if(err) { return handleError(res, err);}
		return res.status(200).json(items);
	});
};

exports.add = function(req, res) {
	item.create(req.body, function(err, item) {
		if(err) { return handleError(res, err);}
		return res.status(201).json(item);
	});
};

exports.findOne = function(req, res) {
	item.findById(req.params.id, function(err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.send(404); }
    return res.json(item);
  });
};

exports.remove = function(req, res) {
	item.findById(req.params.id, function(err, item) {
	    if (err) { return handleError(res, err); }
	    if (!item) { return res.send(404); }
	    item.remove(function(err) {
	      if (err) { return handleError(res, err); }
	      return res.sendStatus(204);
   		});
  	});
};

function handleError(res, err) {
  return res.send(500, err);
}