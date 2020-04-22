'use strict';
module.exports = (sequelize, DataTypes) => {
  const results = sequelize.define('results', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    raceId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'races',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    constructorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'constructors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    driverId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'drivers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    number: {
      type: Sequelize.INTEGER
    },
    grid: {
      type: Sequelize.INTEGER
    },
    position: {
      type: Sequelize.INTEGER
    },
    positionOrder: {
      type: Sequelize.INTEGER
    },
    points: {
      type: Sequelize.FLOAT
    },
    laps: {
      type: Sequelize.INTEGER,
    },
    time: {
      type: Sequelize.STRING
    },
    millisecondes: {
      type: Sequelize.INTEGER
    },
    fastestlap: {
      type: Sequelize.INTEGER
    },
    rank: {
      type: Sequelize.INTEGER
    },
    fastestLapTime: {
      type: Sequelize.STRING
    },
    fastestLapSpeed: {
      type: Sequelize.STRING
    },
    statusId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'status',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }, {});
  results.associate = function(models) {
    driverStandings.belongsTo(models.races);
    driverStandings.belongsTo(models.drivers);
    driverStandings.belongsTo(models.constructors);
    driverStandings.belongsTo(models.status);
  };
  return results;
};