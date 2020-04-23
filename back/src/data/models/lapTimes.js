'use strict';
module.exports = (sequelize, DataTypes) => {
  const lapTimes = sequelize.define('lapTimes', {
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
    lap: {
      type: DataTypes.INTEGER,
      unique: "driver_by_race_by_lap",
    },
    position: {
      type: DataTypes.INTEGER
    },
    time: {
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
    tableName: 'lap_times'
  });
  lapTimes.associate = function(models) {
    lapTimes.belongsTo(models.races);
    lapTimes.belongsTo(models.drivers);
  };
  return lapTimes;
};