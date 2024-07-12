'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'payments',
      'request_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_requests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('payments', 'request_id');
  }
};