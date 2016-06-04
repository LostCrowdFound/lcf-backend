var Item = require('./itemSchema');

exports.postItem = function(req, res) {

    var item = new Item(req.body);

    item.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/items for GET
exports.getItems = function(req, res) {
    // if (!req.user.equals(movie.user)) {
    //       res.sendStatus(401);
    // }
    Item.find(req.query, function(err, items) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(items);
    });
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function(req, res) {
    // if (!req.user.equals(movie.user)) {
    //       res.sendStatus(401);
    // }

    Item.findById(req.params.item_id, function(err, item) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(item);
    });
};
