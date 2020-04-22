'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructorResult = sequelize.define('constructorResults', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    constructorId: {
      type: Sequelize.INTEGER,
        allowNull: false,
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
      allowNull: false,
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
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }, {
    tableName: 'constructor_result'
  });
  constructorResult.associate = function(models) {
    constructorResult.belongsTo(models.constructors);
    constructorResult.belongsTo(models.races);
  };
  return constructorResult;
};