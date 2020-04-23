'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructors = sequelize.define('constructors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ref: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
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
  constructors.associate = function(models) {
    // associations can be defined here
  };
  return constructors;
};