'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructorResult = sequelize.define('constructorResults', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    constructorId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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
    tableName: 'constructor_result'
  });
  constructorResult.associate = function(models) {
    constructorResult.belongsTo(models.constructors);
    constructorResult.belongsTo(models.races);
  };
  return constructorResult;
};