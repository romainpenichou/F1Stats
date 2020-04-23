'use strict';
module.exports = (sequelize, DataTypes) => {
  const Race = sequelize.define('races', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    seasonId: {
      type: DataTypes.INTEGER,
      unique: 'unique_round_by_season',
      references: {
        model: 'seasons',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    circuitId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'circuits',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    round: {
      unique: 'unique_round_by_season',
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    time: {
      type: DataTypes.TIME
    },
    url: {
      type: DataTypes.STRING
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
    indexes: [
      {
          unique: true,
          fields: ['seasonId', 'round']
      }
  ]
  });
  Race.associate = function(models) {
    // associations can be defined here
    Race.belongsTo(models.seasons);
    Race.belongsTo(models.circuits);
  };
  return Race;
};