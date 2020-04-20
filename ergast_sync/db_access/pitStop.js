const dbConnector = require('./_dbConnector');

const tableName = 'work.pit_stops';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (race_id, driver_id, stop, lap, time, duration, milliseconds)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7)'
  queryInsert += 'RETURNING *';

  values = [
    data.raceId,
    data.driverId,
    data.stop,
    data.lap,
    data.time,
    data.duration,
    data.milliseconds
  ];


  
  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}