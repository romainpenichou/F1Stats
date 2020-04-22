'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
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
    },{
      uniqueKeys: {
          actions_unique: {
              fields: ['label']
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('status');
  }
};