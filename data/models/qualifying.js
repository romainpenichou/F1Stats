'use strict';
module.exports = (sequelize, DataTypes) => {
  const qualifying = sequelize.define('qualifying', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    raceId: {
      type: Sequelize.INTEGER,
      unique: "driver_by_race",
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
      unique: "driver_by_race",
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
    position: {
      type: Sequelize.INTEGER
    },
    q1: {
      type: Sequelize.TIME
    },
    q2: {
      type: Sequelize.TIME
    },
    q3: {
      type: Sequelize.TIME
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
  qualifying.associate = function(models) {
    driverStandings.belongsTo(models.races);
    driverStandings.belongsTo(models.drivers);
    driverStandings.belongsTo(models.constructors);
  };
  return qualifying;
};