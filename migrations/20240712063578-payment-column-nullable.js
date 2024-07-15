'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payments',
      'card_brand',
      {
        type: Sequelize.STRING,
        allowNull: true
      }     
    );
    await queryInterface.changeColumn(
      'payments',
      'card_last',
      {
        type: Sequelize.STRING,
        allowNull: true
      }     
    );
    await queryInterface.changeColumn(
      'payments',
      'receipt_url',
      {
        type: Sequelize.STRING,
        allowNull: true
      }     
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payments',
      'card_brand',
      {
        type: Sequelize.STRING,
        allowNull: false
      }     
    );
    await queryInterface.changeColumn(
      'payments',
      'card_last',
      {
        type: Sequelize.STRING,
        allowNull: false
      }     
    );
    await queryInterface.changeColumn(
      'payments',
      'receipt_url',
      {
        type: Sequelize.STRING,
        allowNull: false
      }     
    );
  }
};