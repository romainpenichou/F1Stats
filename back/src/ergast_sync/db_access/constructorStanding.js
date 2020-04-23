const dbConnector = require('./_dbConnector');

const tableName = 'work.constructor_standings';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (constructor_standings_id, race_id, constructor_id, points, position, wins)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6)'
  queryInsert += 'RETURNING *';

  values = [
    data.constructorStandingsId,
    data.raceId,
    data.constructorId,
    data.points,
    data.position,
    data.wins
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}