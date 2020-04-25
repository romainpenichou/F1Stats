class DriverRepository {
  constructor({ dbContext }) {
    this._dbContext = dbContext;
  }

  findAll() {
    console.log(this._dbContext.driversModel);
    
    return this._dbContext.driversModel.findAll()
  }
}

module.exports = DriverRepository;