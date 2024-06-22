'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('RequestDetails', 'request_details');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('request_details', 'RequestDetails');
  },
};
