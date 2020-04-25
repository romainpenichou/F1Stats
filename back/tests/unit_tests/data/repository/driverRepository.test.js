const assert = require('assert');

const {
  fakeDbContext,
  loadFakeData
} = require('../../_helpers/fakeDbContext');

const DriverRepository = 
  require('../../../../src/data/repositories/driverRepository');

describe('Driver repository tests', () => {
  before(async () => {
    await loadFakeData();
  })
  it('Should return all drivers', async () => {
    const driverRepository = new DriverRepository({ 
      dbContext: fakeDbContext 
    });
    
    const drivers = await driverRepository.findAll();

    assert.equal(drivers.length, 1);
  })
})