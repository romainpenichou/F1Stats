const dbConnector = require('./_dbConnector');

const tableName = 'work.seasons';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (year, url)';
  queryInsert += ' values($1, $2)'
  queryInsert += 'RETURNING *';

  values = [ 
    data.year, 
    data.url
  ];

  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}