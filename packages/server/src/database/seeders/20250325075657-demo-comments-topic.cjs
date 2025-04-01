'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        topicId: '1',
        text: 'Комментарий 1 для темы №1',
        author: 'Автор комма 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '1',
        text: 'Ответ на комментарий 1 для темы №1',
        parentCommentId: '1',
        author: 'Автор ответа комма 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '1',
        text: 'Ответ на ответ на комментарий 1 для темы №1',
        parentCommentId: '2',
        author: 'Автор ответа на ответ комма 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '1',
        text: 'Комментарий 2 для темы №1',
        author: 'Автор комма 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '2',
        text: 'Комментарий 1 для темы №2',
        author: 'Автор комма 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '2',
        text: 'Комментарий 2 для темы №2',
        author: 'Автор комма 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: '2',
        text: 'Комментарий 3 для темы №2',
        author: 'Автор комма 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
