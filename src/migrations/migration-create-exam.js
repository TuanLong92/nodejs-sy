'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Exams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            examTitle: {
                type: Sequelize.STRING
            },
            contentTest: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            lessonType: {
                type: Sequelize.STRING
            },

            skillId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            lessonId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            excelFileTestId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },

            skillType: {
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
        await queryInterface.dropTable('Exams');
    }
};