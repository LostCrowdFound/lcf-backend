var mongoose = require('mongoose');
var request = mongoose.model('request');

exports.findAll = function(req, res) {
	request.find(function(err, request) {
		if(err) { return;}
		return res.status(200).json(request);
	});
};

exports.add = function(req, res) {
	request.create(req.body, (function(err, request) {
		if(err) { return handleError(res, err);}
		return res.status(201).json(request);
	}));
};

exports.findOne = function(req, res) {
	request.findById(req.params.id, function(err, request) {
    if (err) { return handleError(res, err); }
    if (!request) { return res.send(404); }
    return res.json(request);
  });
};

exports.remove = function(req, res) {
	request.findById(req.params.id, function(err, request) {
	    if (err) { return handleError(res, err); }
	    if (!request) { return res.send(404); }
	    request.remove(function(err) {
	      if (err) { return handleError(res, err); }
	      return res.sendStatus(204);
   		});
  	});
};

function handleError(res, err) {
  return res.status(500).send(err);
}