'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('site_theme', [
      {
        id: '1',
        theme: 'light',
        description: 'Светлая тема оформления',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        theme: 'dark',
        description: 'Темная тема оформления',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('site_theme', null, {});
  },
};
