const dbConnector = require('./_dbConnector');

module.exports.handle = async() => {
  let query = 'select public.load_data();';

  const result = await dbConnector.client.query(query);

  return result;
}