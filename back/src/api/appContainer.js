const { createContainer, asClass, asFunction } = require('awilix');

const config = require('./config.json');
const DbContext = require('../data/dbContext');
/**
 * Load repositories
 */
const DriverRepository = require('../data/repositories/driverRepository');

/**
 * Load use cases
 */
const driverUseCaseFindAll = require('../use_cases/driver_use_case/findAll');

const driverController = require('./controllers/driverController');

/**
 * Create application container for dependencies injection
 */
module.exports.load = async() => {
  const container = createContainer();
  container.register({
    dbContext: asClass(DbContext).inject(() => ({ config: config.dbConfig })),
    driverRepository: asClass(DriverRepository),
    driverUseCaseFindAll: asFunction(driverUseCaseFindAll),
    driverController: asFunction(driverController)
  });

  return container;
}