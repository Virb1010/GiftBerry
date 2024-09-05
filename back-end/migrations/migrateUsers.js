'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'name', {
        type: Sequelize.STRING,
        allowNull: true
    })
    await queryInterface.addColumn('users', 'birthday', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'interests', {
      type: Sequelize.JSON,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'birthday');
    await queryInterface.removeColumn('users', 'interests');
  }
};
