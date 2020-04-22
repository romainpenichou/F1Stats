'use strict';
module.exports = (sequelize, DataTypes) => {
  const driverStandings = sequelize.define('driverStandings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    driverId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.INTEGER,
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
      type: Sequelize.FLOAT
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
    tableName: 'driver_standings'
  });
  driverStandings.associate = function(models) {
    driverStandings.belongsTo(models.races);
    driverStandings.belongsTo(models.drivers);
  };
  return driverStandings;
};