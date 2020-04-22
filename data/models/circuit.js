'use strict';
module.exports = (sequelize, DataTypes) => {
  const Circuit = sequelize.define('circuits', {
    iid: {
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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.FLOAT
    },
    lng: {
      type: Sequelize.FLOAT
    },
    alt: {
      type: Sequelize.INTEGER
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
  Circuit.associate = function(models) {
    // associations can be defined here
  };
  return Circuit;
};