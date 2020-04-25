var express = require('express');
var router = express.Router();

const baseApi = '/api';

const buidlUrl = (...url) => {
  url.unshift(baseApi);
  return url.join('/');
}

module.exports = ({ appContainer }) => {
  /**
   * Route for Driver API
   */
  const driverController = appContainer.resolve('driverController');

  router.get(buidlUrl('drivers'), driverController.get);

  return router;
}