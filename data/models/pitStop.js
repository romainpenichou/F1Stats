'use strict';
module.exports = (sequelize, DataTypes) => {
  const pitStop = sequelize.define('pitStops', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "driver_by_race_by_lap",
      references: {
        model: 'drivers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "driver_by_race_by_lap",
      references: {
        model: 'races',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    stop: {
      type: DataTypes.INTEGER,
      unique: "driver_by_race_by_lap",
    },
    lap: {
      type: DataTypes.INTEGER
    },
    position: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.TIME
    },
    duration: {
      type: DataTypes.STRING
    },
    milliseconds: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'pit_stops'
  });
  pitStop.associate = function(models) {
    pitStop.belongsTo(models.races);
    pitStop.belongsTo(models.drivers);
  };
  return pitStop;
};