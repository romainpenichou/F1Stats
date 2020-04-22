'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('qualifyings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      raceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'races',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      constructorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'constructors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      number: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      q1: {
        type: Sequelize.TIME
      },
      q2: {
        type: Sequelize.TIME
      },
      q3: {
        type: Sequelize.TIME
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
              fields: ['raceId', 'driverId']
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('qualifyings');
  }
};