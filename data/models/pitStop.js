'use strict';
module.exports = (sequelize, DataTypes) => {
  const pitStop = sequelize.define('pitStops', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    driverId: {
      type: Sequelize.INTEGER,
      unique: "driver_by_race_by_lap",
      references: {
        model: 'drivers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    raceId: {
      type: Sequelize.INTEGER,
      unique: "driver_by_race_by_lap",
      references: {
        model: 'races',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    stop: {
      type: Sequelize.INTEGER,
      unique: "driver_by_race_by_lap",
    },
    lap: {
      type: Sequelize.INTEGER
    },
    position: {
      type: Sequelize.INTEGER
    },
    time: {
      type: Sequelize.TIME
    },
    duration: {
      type: Sequelize.STRING
    },
    milliseconds: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }, {
    tableName: 'pit_stops'
  });
  pitStop.associate = function(models) {
    driverStandings.belongsTo(models.races);
    driverStandings.belongsTo(models.drivers);
  };
  return pitStop;
};