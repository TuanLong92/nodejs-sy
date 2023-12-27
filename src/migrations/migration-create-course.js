'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Courses', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            createdBy: {
                type: Sequelize.STRING
            },
            otherCourseDetail: {
                type: Sequelize.TEXT
            },
            courseLevel: {
                type: Sequelize.STRING
            },
            numberOfVideo: {
                type: Sequelize.STRING
            },
            numberOfExam: {
                type: Sequelize.STRING
            },
            numberOfFlashCard: {
                type: Sequelize.STRING
            },
            numberOfLearnedVideo: {
                type: Sequelize.STRING
            },
            numberOfLearnedExam: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Courses');
    }
};