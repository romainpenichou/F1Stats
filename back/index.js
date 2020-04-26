// const DriverRepository = require('./src/data/repositories/driverRepository');

// const DbContext = require('./src/data/dbContext');

// const dbConfig = require(__dirname + '/config.json')["dbConfig"];

// (async() => {
//   driverRepository = new DriverRepository(new DbContext(dbConfig));
//   console.log(await driverRepository.findAll());
// })();


const server = require('./src/api/server');

server.start();
