/**
 * Use case to list all drivers
 * 
 * @param {object} param0 with {
 *  driverRepository: repository for handle driver entity
 * } 
 */

const driverUseCaseFindAll = ({
  driverRepository
}) => {
  const handle = async() => {
    return await driverRepository.findAll();
  }

  return {
    handle
  }
}

module.exports = driverUseCaseFindAll;