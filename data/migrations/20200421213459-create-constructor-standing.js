'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('constructor_standings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      raceId: {
        type: Sequelize.INTEGER,
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
      position: {
        type: Sequelize.INTEGER
      },
      wins: {
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
              fields: ['constructorId', 'raceId']
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('constructor_standings');
  }
};