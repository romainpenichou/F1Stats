'use strict';
module.exports =  (sequelize, DataTypes) => {
  const drivers = sequelize.define('drivers', {
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
    number: {
      type: DataTypes.INTEGER
    },
    code: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
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
  drivers.associate = function(models) {
    // associations can be defined here
  };
  return drivers;
};