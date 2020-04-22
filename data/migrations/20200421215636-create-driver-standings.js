'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('driver_standings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER,
        unique: "driver_by_race",
        references: {
          model: 'drivers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      raceId: {
        type: Sequelize.INTEGER,
        unique: "driver_by_race",
        references: {
          model: 'races',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      points: {
        type: Sequelize.FLOAT
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
              fields: ['driverId', 'raceId']
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('driver_standings');
  }
};