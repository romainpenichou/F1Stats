const dbConnector = require('./_dbConnector');

const tableName = 'work.races';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (race_id, year, round, circuit_id, name, date, time, url)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7, $8)'
  queryInsert += 'RETURNING *';

  values = [
    data.raceId,
    data.year,
    data.round,
    data.circuitId,
    data.name,
    data.date,
    data.time === '\\N' ? null : data.time,
    data.url
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}