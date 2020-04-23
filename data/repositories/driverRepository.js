class DriverRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  findAll() {
    return this._dbContext.driversModel.findAll()
  }
}

module.exports = DriverRepository;