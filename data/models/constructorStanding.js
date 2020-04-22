'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructorStanding = sequelize.define('constructorStandings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    constructorId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.INTEGER
    },
    constructorId: {
      type: Sequelize.INTEGER,
      unique: "constructor_by_race",
      references: {
        model: 'constructors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    raceId: {
      type: Sequelize.INTEGER,
      unique: "constructor_by_race",
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
    position: {
      type: Sequelize.INTEGER
    },
    wins: {
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
    tableName: 'constructor_standings'
  });
  constructorStanding.associate = function(models) {
    constructorStanding.belongsTo(models.constructors);
    constructorStanding.belongsTo(models.races);
  };
  return constructorStanding;
};