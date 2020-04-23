'use strict';
module.exports = (sequelize, DataTypes) => {
  const results = sequelize.define('results', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'races',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    constructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'constructors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'drivers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    number: {
      type: DataTypes.INTEGER
    },
    grid: {
      type: DataTypes.INTEGER
    },
    position: {
      type: DataTypes.INTEGER
    },
    positionOrder: {
      type: DataTypes.INTEGER
    },
    points: {
      type: DataTypes.FLOAT
    },
    laps: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.STRING
    },
    millisecondes: {
      type: DataTypes.INTEGER
    },
    fastestlap: {
      type: DataTypes.INTEGER
    },
    rank: {
      type: DataTypes.INTEGER
    },
    fastestLapTime: {
      type: DataTypes.STRING
    },
    fastestLapSpeed: {
      type: DataTypes.STRING
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'status',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  results.associate = function(models) {
    results.belongsTo(models.races);
    results.belongsTo(models.drivers);
    results.belongsTo(models.constructors);
    results.belongsTo(models.status);
  };
  return results;
};