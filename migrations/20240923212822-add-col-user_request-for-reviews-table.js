'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_reviews', 'request_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'user_requests',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_reviews', 'request_id');
  },
};
