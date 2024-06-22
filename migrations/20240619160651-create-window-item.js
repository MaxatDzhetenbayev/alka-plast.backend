'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('window_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      characteristics: {
        type: Sequelize.JSONB
      },
		window_id: {
		  type: Sequelize.INTEGER,
		  references: {
			 model: 'windows',
			 key: 'id'
		  },
		  onUpdate: 'CASCADE',
		  onDelete: 'CASCADE'
		},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WindowItems');
  }
};