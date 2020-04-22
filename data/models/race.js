'use strict';
module.exports = (sequelize, DataTypes) => {
  const Race = sequelize.define('races', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    seasonId: {
      type: Sequelize.INTEGER,
      unique: 'unique_round_by_season',
      references: {
        model: 'seasons',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    circuitId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'circuits',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    round: {
      unique: 'unique_round_by_season',
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    time: {
      type: Sequelize.TIME
    },
    url: {
      type: Sequelize.STRING
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
    uniqueKeys: {
        actions_unique: {
            fields: ['seasonId', 'round']
        }
    }
  });
  Race.associate = function(models) {
    // associations can be defined here
    Race.belongsTo(models.seasons);
    Race.belongsTo(models.circuits);
  };
  return Race;
};