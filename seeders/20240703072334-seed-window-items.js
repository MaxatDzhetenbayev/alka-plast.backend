'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'window_items',
      [
        {
          name: 'ARTEC',
          price: 15502,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 16,
            noise: 15,
            design: 16,
          }),
          window_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'EXPROF 58',
          price: 13952,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 15,
            noise: 14,
            design: 15,
          }),
          window_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'EXPROF 70',
          price: 15812,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 17,
            noise: 16,
            design: 17,
          }),
          window_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'EXPROF 101',
          price: 17784,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 18,
            noise: 18,
            design: 18,
          }),
          window_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'GALWIN 58',
          price: 12548,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 15,
            noise: 14,
            design: 14,
          }),
          window_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'GALWIN 70',
          price: 12958,
          image:
            'http://localhost:3000/uploads/file-1719683177327-965263752.png',
          characteristics: JSON.stringify({
            thermal: 17,
            noise: 17,
            design: 16,
          }),
          window_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('window_items', null, {});
  },
};
