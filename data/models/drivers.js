'use strict';
module.exports = (sequelize, DataTypes) => {
  const drivers = sequelize.define('drivers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ref: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    number: {
      type: Sequelize.INTEGER
    },
    code: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthday: {
      type: Sequelize.DATE
    },
    nationality: {
      type: Sequelize.STRING,
      allowNull: false
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
  drivers.associate = function(models) {
    // associations can be defined here
  };
  return drivers;
};