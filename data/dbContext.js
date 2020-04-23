const Sequelize = require('sequelize');
const driversModel = require('./models/drivers');

class DbContext {
  constructor(config) {
    if (config.use_env_variable) {
      this.sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      this.sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    this.driversModel = driversModel(this.sequelize, Sequelize);
  }

}

module.exports = DbContext;