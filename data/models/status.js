'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.STRING,
      unique: true
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
  status.associate = function(models) {
    // associations can be defined here
  };
  return status;
};