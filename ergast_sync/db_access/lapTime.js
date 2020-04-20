const dbConnector = require('./_dbConnector');

const tableName = 'work.lap_times';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (race_id, driver_id, lap, position, time, milliseconds)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6)'
  queryInsert += 'RETURNING *';

  values = [
    data.raceId,
    data.driverId,
    data.lap,
    data.position,
    data.time,
    data.milliseconds
  ];


  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}