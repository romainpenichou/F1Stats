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
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nationality: DataTypes.STRING,
    url: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
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