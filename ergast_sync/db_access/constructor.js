const dbConnector = require('./_dbConnector');

const tableName = 'work.contructors';

module.exports.deleteAll = async(data) => {
  const query = `delete from ${tableName}`;

  await dbConnector.client.query(query);
}

module.exports.insert = async(data) => {
  let queryInsert = `insert into ${tableName}`;
  queryInsert += ' (constructor_id, constructor_ref, name, nationality, url)';
  queryInsert += ' values($1, $2, $3, $4, $5)'
  queryInsert += 'RETURNING *';

  values = [data.constructorId,
    data.constructorRef,
    data.name,
    data.nationality,
    data.url
  ];
  
  const result = await dbConnector.client.query(queryInsert, values);

  return result;
}