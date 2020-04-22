'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lap_times', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER,
        unique: "driver_by_race_by_lap",
        references: {
          model: 'drivers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      raceId: {
        type: Sequelize.INTEGER,
        unique: "driver_by_race_by_lap",
        references: {
          model: 'races',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      lap: {
        type: Sequelize.INTEGER,
        unique: "driver_by_race_by_lap",
      },
      position: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      milliseconds: {
        type: Sequelize.INTEGER
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
              fields: ['driverId', 'raceId', 'lap']
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lap_times');
  }
};