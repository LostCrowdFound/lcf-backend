var mongoose = require('mongoose');
var user = mongoose.model('user');
//var user = require('../models/user');

exports.findAll = function(req, res) {
	user.find({}, function(err, users) {
		if(err) { 
			return handleError(res, err);
		}
		return res.status(200).json(users);
	});
};

exports.add = function(req, res) {
	user.create(req.body, (function(err, user) {
		if (err) { 
			return handleError(res, err); 
		}
		return res.status(201).json(user);
	}));
};

exports.findOne = function(req, res) {
	user.findById(req.params.id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    return res.json(user);
  });
};

exports.remove = function(req, res) {
	user.findById(req.params.id, function(err, user) {
	    if (err) { return handleError(res, err); }
	    if (!user) { return res.send(404); }
	    user.remove(function(err) {
	      if (err) { return handleError(res, err); }
	      return res.sendStatus(204);
   		});
  	});
};

function handleError(res, err) {
  return res.send(500, err);
}