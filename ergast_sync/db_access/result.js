const dbConnector = require('./_dbConnector');

const tableName = 'work.results';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (result_id, race_id, driver_id, constructor_id, number, grid, position, position_order, points, laps, time, milliseconds, fastestLap, rank, fastestLapTime, fastestLapSpeed, statusId)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)'
  queryInsert += 'RETURNING *';

  values = [
    data.resultId,
    data.raceId,
    data.driverId,
    data.constructorId,
    data.number === '\\N' ? null : data.number,
    data.grid,
    data.position === '\\N' ? null : data.position,
    data.positionOrder,
    data.points,
    data.laps,
    data.time === '\\N' ? null : data.time,
    data.milliseconds === '\\N' ? null : data.milliseconds,
    data.fastestLap === '\\N' ? null : data.fastestLap,
    data.rank === '\\N' ? null : data.rank,
    data.fastestLapTime === '\\N' ? null : data.fastestLapTime,
    data.fastestLapSpeed === '\\N' ? null : data.fastestLapSpeed,
    data.statusId
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}