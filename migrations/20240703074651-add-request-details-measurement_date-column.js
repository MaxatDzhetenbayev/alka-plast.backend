'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('request_details', 'measurement_date', {
     type: Sequelize.DATE,
     allowNull: false,
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('request_details', 'measurement_date');
  }
};
