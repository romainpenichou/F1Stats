const dbConnector = require('./_dbConnector');

const tableName = 'work.driver_standings';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (driver_standings_id, race_id, driver_id, points, position, wins)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6)'
  queryInsert += 'RETURNING *';

  values = [
    data.driverStandingsId,
    data.raceId,
    data.driverid,
    data.points,
    data.position,
    data.wins
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}