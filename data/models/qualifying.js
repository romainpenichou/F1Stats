'use strict';
module.exports = (sequelize, DataTypes) => {
  const qualifying = sequelize.define('qualifying', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
      unique: "driver_by_race",
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
    position: {
      type: DataTypes.INTEGER
    },
    q1: {
      type: DataTypes.TIME
    },
    q2: {
      type: DataTypes.TIME
    },
    q3: {
      type: DataTypes.TIME
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
  qualifying.associate = function(models) {
    qualifying.belongsTo(models.races);
    qualifying.belongsTo(models.drivers);
    qualifying.belongsTo(models.constructors);
  };
  return qualifying;
};