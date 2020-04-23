'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('seasons', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    year: {
      type: DataTypes.INTEGER,
      unique: true
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
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
  };
  return Season;
};