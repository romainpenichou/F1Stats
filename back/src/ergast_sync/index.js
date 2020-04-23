const EventEmitter = require('events');
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
const cliProgress = require('cli-progress');

const {millisecondsToTime } = require('../tools/date');

const circuitAccess = require("./db_access/circuit");
const constructorResultAccess = require("./db_access/constructorResult");
const constructorAccess = require("./db_access/constructor");
const constructorStandingAccess = require("./db_access/constructorStanding");
const driverAccess = require("./db_access/drivers");
const driverStandingAccess = require("./db_access/driverStanding");
const pitStoprAccess = require("./db_access/pitStop");
const qualifyingAccess = require("./db_access/qualifying");
const lapTimeAccess = require("./db_access/lapTime");
const resultAccess = require("./db_access/result");
const raceAccess = require("./db_access/race");
const statusAccess = require("./db_access/status");
const seasonAccess = require("./db_access/season");
const dbSyncFunc = require("./db_access/dbSyncFunc");

const dateStart = new Date();

const csvPath = path.join(__dirname, 'csv');

const myEmitter = new EventEmitter();

const csvToLoad = [
  { file: "circuits.csv", entityAccess: circuitAccess},
  { file: "constructor_results.csv", entityAccess: constructorResultAccess},
  { file: "constructors.csv", entityAccess: constructorAccess},
  { file: "constructor_standings.csv", entityAccess: constructorStandingAccess},
  { file: "drivers.csv", entityAccess: driverAccess },
  { file: "driver_standings.csv", entityAccess: driverStandingAccess },
  { file: "lap_times.csv", entityAccess: lapTimeAccess },
  { file: "pit_stops.csv", entityAccess: pitStoprAccess },
  { file: "qualifying.csv", entityAccess: qualifyingAccess },
  { file: "results.csv", entityAccess: resultAccess },
  { file: "races.csv", entityAccess: raceAccess },
  { file: "status.csv", entityAccess: statusAccess },
  { file: "seasons.csv", entityAccess: seasonAccess}
];

var multibar = new cliProgress.MultiBar({
  format: '{csvName} |' + '{bar}' + '| {percentage}% || {value}/{total} {nbErrors}',
  clearOnComplete: false,
  hideCursor: true,
  barsize: 20
}, cliProgress.Presets.shades_grey);

const maxCsvNameSize = csvToLoad.reduce((maxSize, currValue) => {
  return maxSize < currValue.file.length ? currValue.file.length : maxSize;
}, 0);

var progressBars = {};

const loadResutlByCsv = [];

const loadFromCsv = async (csvName, entityAccess) => {
  var csvFile = path.join(csvPath, csvName);

  var dataToInsert = [];

  var result = {
    linesInSuccess: [],
    linesInError: [],
  }

  try {
    await entityAccess.deleteAll();
  } catch(ex) {
    eventContent = {
      csv: csvName,
      success: [],
      errors: [],
      globalError: {
        message: "Error on delete table's data",
        error: ex
      }
    };

    myEmitter.emit('csv_load', eventContent);
  }

  fs.createReadStream(csvFile)
  .pipe(csv())
  .on('data', async(row) => {
    dataToInsert.push(row);
  })
  .on('end', async() => {
    myEmitter.emit('csv_readed', {
      csv: csvName,
      totalLine: dataToInsert.length
    });

    for(let i = 0; i < dataToInsert.length; i++) {
      const data = dataToInsert[i];
      
      try {
        await entityAccess.insert(data);
        result.linesInSuccess.push(data);
        myEmitter.emit('line_inserted', {
          csv: csvName,
          totalLineInserted: 
            result.linesInSuccess.length + result.linesInError.length
        })
      } catch(ex) {
        result.linesInError.push({
          detail: ex,
          data: data
        });
      }
    }

    eventContent = {
      csv: csvName,
      success: result.linesInSuccess,
      errors: result.linesInError
    }

    myEmitter.emit('csv_load', eventContent);
  });
};

myEmitter.on('csv_readed', (content) => {
  if(progressBars[content.csv] === undefined) {
    csvName = content.csv;

    while(csvName.length < maxCsvNameSize) {
      csvName += ' ';
    };

    progressBars[content.csv] = 
      multibar.create(content.totalLine, 0, { 
        csvName: csvName,
        nbErrors: ''
      });
  }
});

myEmitter.on('line_inserted', (content) => {
  if(progressBars[content.csv] !== undefined) {
    progressBars[content.csv].update(content.totalLineInserted);
  }
});

myEmitter.on('csv_load', async (content) => {
  loadResutlByCsv.push(content);

  progressBars[content.csv].update(content.success.length + content.errors.length, {
    nbErrors: '|| Errors: ' + content.errors.length
  });

  progressBars[content.csv].stop();

  if(content.errors.length > 0) {
    console.log(content.errors);
  }

  if(loadResutlByCsv.length === csvToLoad.length) {
    multibar.stop();

    loadResutlByCsv.map(x => {
      console.log(
        `CSV loaded: ${x.csv} ` +
        `(${x.success.length + x.errors.length} lines) ` + 
        `with ${x.errors.length} errors ` +
        `${x.globalError || null !== null ? 
          `Global error: ${x.globalError.message}, ${x.globalError.error}`: ''}`
      );
    }); 

    console.log("Executing load_data function ...");

    try {
      await dbSyncFunc.handle();
      const dateEnd = new Date();
      const diffTime = Math.abs(dateEnd - dateStart);
      console.log(`total duration: ${millisecondsToTime(diffTime)}s`);
    } catch(ex) {
      console.log("One error is occurring during sync in database");
      console.log(ex);
    }
    
    process.exit(0);
  }
});


module.exports.sync = async () => {
  csvToLoad.forEach(x => loadFromCsv(x.file, x.entityAccess));
}