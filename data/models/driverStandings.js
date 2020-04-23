'use strict';
module.exports = (sequelize, DataTypes) => {
  const driverStandings = sequelize.define('driverStandings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "driver_by_race",
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
      unique: "driver_by_race",
      references: {
        model: 'races',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    points: {
      type: DataTypes.FLOAT
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
    tableName: 'driver_standings'
  });
  driverStandings.associate = function(models) {
    driverStandings.belongsTo(models.races);
    driverStandings.belongsTo(models.drivers);
  };
  return driverStandings;
};