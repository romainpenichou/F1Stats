const dbConnector = require('./_dbConnector');

const tableName = 'work.drivers';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (driver_id, driver_ref, number, code, forename, surname, dob, nationality, url)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7, $8, $9)'
  queryInsert += 'RETURNING *';

  values = [
    data.driverId,
    data.driverRef,
    (data.number === '\\N' ? null : data.number),
    data.code,
    data.forename,
    data.surname,
    data.dob,
    data.nationality,
    data.url
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}