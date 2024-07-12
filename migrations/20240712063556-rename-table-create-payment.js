'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('create-payments', 'payments');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('payments', 'create-payments');
  }
};