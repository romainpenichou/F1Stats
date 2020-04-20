const { Pool, Client } = require('pg');

let dbConnector = null;

const DbConnector = class {
  constructor() {
    this.client = new Client({
      user: 'f1_stats_usr',
      host: 'localhost',
      database: 'f1_stats',
      password: 'f1_stats_pwd',
      port: 5432,
    });
  }

  open() {
    this.client.connect();
  }
  
  close() {
    this.client.end();
  }
}

if(dbConnector === null) {
  dbConnector = new DbConnector();
  dbConnector.open();
}

module.exports = dbConnector;