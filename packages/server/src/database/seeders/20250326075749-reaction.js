'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
		await queryInterface.bulkInsert('reactions', [
			{
			  topicId: 1,
			  userId: 1,
			  type: 'like',
			},
			{
			  topicId: 1,
			  userId: 2,
			  type: 'dislike',
			},
		], {});
  },

  async down (queryInterface) {
		await queryInterface.bulkDelete('reactions', null, {});
  }
};
