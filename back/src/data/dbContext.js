const Sequelize = require('sequelize');
const driversModel = require('./models/drivers');

class DbContext {
  constructor({ config }) {
    if (config.url) {
      this.sequelize = new Sequelize(config.url, config);
    } else {
      this.sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    this.driversModel = driversModel(this.sequelize, Sequelize);
    console.log(this.driversModel);
    
  }

}

module.exports = DbContext;