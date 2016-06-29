var ItemInfo = require('./itemInfoSchema');

exports.getItemInfo = function (req, res) {
	  ItemInfo.find({}, function (err, iteminfo) {
	      if (err) {
	        return res.status(500).send(err);
	      }
	      res.json(iteminfo);
	    }
	 ); 
};