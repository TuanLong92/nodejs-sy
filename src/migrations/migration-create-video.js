'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Videos', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            videoName: {
                type: Sequelize.STRING
            },
            contentVideo: {
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            skillId: {
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
        await queryInterface.dropTable('Videos');
    }
};