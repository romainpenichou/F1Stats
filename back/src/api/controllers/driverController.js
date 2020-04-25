const driverController = ({ driverUseCaseFindAll }) => {
  const get = async(req, res, next) => {
    const drivers = await driverUseCaseFindAll.handle();
    res.send(drivers);
  }

  return {
    get
  }
}

module.exports = driverController;

