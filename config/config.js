var env = process.env.NODE_ENV || 'development';

var config = {
  port: 3000,
  db: 'mongodb://localhost/lcf',
  host: 'localhost'
};

if (env === "bluwemix") {
  var conf = JSON.parse(process.env.VCAP_SERVICES);
  config.db = conf["mongodb-2.2"][0].credentials.url;
  config.port = process.env.VCAP_APP_PORT || 3000;
  config.host = process.env.VCAP_APP_HOST || 'localhost';
}

module.exports = config;