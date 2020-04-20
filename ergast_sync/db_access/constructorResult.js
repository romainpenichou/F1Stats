const dbConnector = require('./_dbConnector');

const tableName = 'work.contructor_result';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (constructor_results_id, race_id, constructor_id, points)';
  queryInsert += ' values($1, $2, $3, $4)'
  queryInsert += 'RETURNING *';

  values = [
    data.constructorResultsId,
    data.raceId,
    data.constructorId,
    data.points
  ];
  
  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}