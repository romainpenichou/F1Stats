const express = require('express');
var cors = require('cors')

const config = require('./config.js');
const appContainer = require('./appContainer');
const router = require('./router');

let app;
let server;

console.log(config);

/**
 * create and start express server
 */
const startServer = async () => {
  app = express();
  app.use(cors());
  
  const container = await appContainer.load();

  app.use('/', router({
    appContainer: container
  }));

  const port = config.server.port;  
  server = app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
  });

  return app;
}

/**
 * Close server
 */
const closeServer = () => {
  server.close();
}

module.exports = {
  start: startServer,
  close: closeServer
};

