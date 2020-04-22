const dbConnector = require('./_dbConnector');

const tableName = 'work.circuits';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (circuit_id, circuit_ref, name, location, country, lat, lng, alt, url)';
  queryInsert += ' values($1, $2, $3, $4, $5, $6, $7, $8, $9)'
  queryInsert += 'RETURNING *';

  values = [ 
    data.circuitId,
    data.circuitRef,
    data.name,
    data.location,
    data.country,
    data.lat=== '\\N' ? null : data.alt,
    data.lng,
    data.alt,
    data.url
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}