const dbConnector = require('./_dbConnector');

const tableName = 'work.qualifying';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (qualify_id, race_id, driver_id, constructor_id, number, position, q1, q2, q3)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7, $8, $9)'
  queryInsert += 'RETURNING *';

  values = [
    data.qualifyId,
    data.raceId,
    data.driverId,
    data.constructorId,
    data.number,
    data.position,
    data.q1 === '\\N' || data.q1 === '' ? null : data.q1,
    data.q2 === '\\N' || data.q2 === '' ? null : data.q2,
    data.q3 === '\\N' || data.q3 === '' ? null : data.q3
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}