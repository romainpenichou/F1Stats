const sequelize = require('sequelize');
const DbContext = require('../../../src/data/dbContext');

const dbConfig = {
  username: "f1_stats_usr",
  password: "f1_stats_pwd",
  database: "f1_stats",
  dialect: 'sqlite',
  storage: ':memory:',
  operatorsAliases: "1",
  logging: false
}

const dbContext = new DbContext({ config: dbConfig });

const loadDrivers = async () => {
  drivers = [
    {
      ref: 'ref',
      number: 12,
      code: 'AZE',
      firstname: 'firstname',
      lastname: 'lastname',
      birthday: new Date("01/01/1995"),
      nationality: "français",
      url: 'url'
    }
  ];

  for(const index in drivers) {
    await dbContext.driversModel.create(drivers[index]);
  }
}

const loadFakeData = async() => {
  await dbContext.sequelize.sync();
  await loadDrivers();
}

module.exports.fakeDbContext = dbContext;
module.exports.loadFakeData = loadFakeData;
