const express = require('express');

const config = require('./config.json');
const appContainer = require('./appContainer');
const router = require('./router');

let app;
let server;

/**
 * create and start express server
 */
const startServer = async () => {
  app = express();
  const container = await appContainer.load();

  app.use('/', router({
    appContainer: container
  }));

  const port = config.server.port || 3000;  
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

