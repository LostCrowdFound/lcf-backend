var Config = {};
Config.db = {};
Config.app = {};
Config.auth = {};

Config.db.host = 'localhost:27017';
Config.db.name = 'lcf-dev-db';

// Use environment defined port or 3000
Config.app.port = process.env.PORT || 3000;

Config.auth.jwtSecret = 'very secret secret';

Config.seedDB = true;

module.exports = Config;
