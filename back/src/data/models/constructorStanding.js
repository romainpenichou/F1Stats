'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructorStanding = sequelize.define('constructorStandings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    constructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'constructors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    points: {
      type: DataTypes.FLOAT
    },
    position: {
      type: DataTypes.INTEGER
    },
    wins: {
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
    tableName: 'constructor_standings'
  });
  constructorStanding.associate = function(models) {
    constructorStanding.belongsTo(models.constructors);
    constructorStanding.belongsTo(models.races);
  };
  return constructorStanding;
};