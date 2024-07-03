'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('item_features', [
      {
        title: 'Стекло толщиной 4 мм',
        description: 'Возможно заказать со стеклом толщиной 6 мм.',
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Стеклопакет толщиной до 36 мм',
        description:
          'Двухкамерный теплопакет класса 4+ к каждому окну в подарок.',
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Пятикамерный профиль шириной 70 мм',
        description:
          'Эконом класса имеет широкую облась применения для любых типов домов.',
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Уплотнительный контур',
        description:
          'Обеспечивает защиту от проникновения влаги и пыли в помещение, доступен в трех вариантах цвета: черном, светло-сером и белом.',
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Стальное замкнутое армирование',
        description: 'Придает упругость и прочность оконному ПВХ профилю.',
        item_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_features', null, {});
  },
};
