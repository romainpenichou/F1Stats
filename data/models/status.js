'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label: {
      type: DataTypes.STRING,
      unique: true
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
  status.associate = function(models) {
    // associations can be defined here
  };
  return status;
};