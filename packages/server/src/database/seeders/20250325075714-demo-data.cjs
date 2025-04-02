'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert(
      'users_data',
      [
        {
          id: '6',
          name: 'Alice',
          authMethod: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '7',
          name: 'Bob',
          authMethod: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '8',
          name: 'Charlie',
          authMethod: 'yandex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )

    const usersThemeId = await queryInterface.sequelize.query(
      `SELECT id from "users_data";`
    )

    const userId = usersThemeId[0].map(user => user.id);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Alice',
          authMethod: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bob',
          authMethod: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Charlie',
          authMethod: 'yandex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )

    const usersDataId = await queryInterface.sequelize.query(
      `SELECT id from "users";`
    )

    const usersId = usersDataId[0]

    const usersDataNames = await queryInterface.sequelize.query(
      `SELECT name from "users";`
    )

    const usersName = usersDataNames[0]

    await queryInterface.bulkInsert(
      'topics',
      [
        {
          name: 'Заголовок топика №1',
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          author: usersName[0].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Заголовок топика №2',
          text: 'Lorem',
          author: usersName[0].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )

    const topicsData = await queryInterface.sequelize.query(
      `SELECT id from "topics";`
    )

    const topics = topicsData[0]

    await queryInterface.bulkInsert(
      'comments',
      [
        {
          topicId: topics[0].id,
          text: 'Комментарий 1 для темы №1',
          author: usersName[0].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: topics[0].id,
          text: 'Комментарий 2 для темы №1',
          author: usersName[0].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: topics[1].id,
          text: 'Комментарий 1 для темы №2',
          author: usersName[0].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: topics[1].id,
          text: 'Комментарий 2 для темы №2',
          author: usersName[2].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: topics[1].id,
          text: 'Комментарий 3 для темы №2',
          author: usersName[1].name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'reactions',
      [
        {
          topicId: topics[0].id,
          userId: usersId[0].id,
          type: 'like',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: topics[1].id,
          userId: usersId[0].id,
          type: 'dislike',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )

    await queryInterface.bulkInsert('site_theme', [
      {
        theme: 'light',
        description: 'Светлая тема оформления',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theme: 'dark',
        description: 'Темная тема оформления',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const themesData = await queryInterface.sequelize.query(
      `SELECT id from "site_theme";`
    )

    const themes = themesData[0]

    await queryInterface.bulkInsert('user_theme', [
      {
        ownerId: userId[0],
        themeId: themes[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: userId[1],
        themeId: themes[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: userId[2],
        themeId: themes[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    return
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_theme', null, {})
    await queryInterface.bulkDelete('site_theme', null, {})
    await queryInterface.bulkDelete('reactions', null, {})
    await queryInterface.bulkDelete('comments', null, {})
    await queryInterface.bulkDelete('topics', null, {})
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('users_data', null, {})
  },
}
