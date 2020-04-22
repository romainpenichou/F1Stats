'use strict';
module.exports = (sequelize, DataTypes) => {
  const constructors = sequelize.define('constructors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ref: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
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
  constructors.associate = function(models) {
    // associations can be defined here
  };
  return constructors;
};