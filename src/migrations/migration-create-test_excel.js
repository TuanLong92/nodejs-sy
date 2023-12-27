'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TestExcels', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lessonName: {
                type: Sequelize.STRING
            },
            lessonType: {
                type: Sequelize.STRING
            },
            courseLevel: {
                type: Sequelize.STRING
            },
            skillType: {
                type: Sequelize.STRING
            },
            questionImage: {
                type: Sequelize.STRING
            },
            question: {
                type: Sequelize.STRING
            },
            answer1: {
                type: Sequelize.STRING
            },
            answer2: {
                type: Sequelize.STRING
            },
            answer3: {
                type: Sequelize.STRING
            },
            answer4: {
                type: Sequelize.STRING
            },
            corectAnswer: {
                type: Sequelize.STRING
            },
            examId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('TestExcels');
    }
};