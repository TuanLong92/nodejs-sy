'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LessonSkill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // LessonSkill.belongsTo(models.Lesson, { foreignKey: "lessonId" })
            // LessonSkill.belongsTo(models.Skill, { foreignKey: "skillId" })

        }
    }
    LessonSkill.init({
        // id: DataTypes.STRING,khong can khai bao id
        skillId: DataTypes.INTEGER,
        lessonId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'LessonSkill',
    });
    return LessonSkill;
};