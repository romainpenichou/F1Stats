'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('seasons', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    year: {
      type: Sequelize.INTEGER,
      unique: true
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
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
  };
  return Season;
};