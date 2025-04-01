'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user_theme', [
      {
        id: '1',
        ownerId: '1',
        themeId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        ownerId: '2',
        themeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        ownerId: '3',
        themeId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  
  async down(queryInterface) {
    await queryInterface.bulkDelete('user_theme', null, {});
  }
};
  