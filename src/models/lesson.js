'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Lesson.belongsTo(models.Course, { foreignKey: "courseId" })
            Lesson.hasMany(models.ResultExam, { foreignKey: "lessonId" })
            // Lesson.hasMany(models.LessonSkill, { foreignKey: "lessonId" })
            Lesson.hasMany(models.Skill, { foreignKey: "lessonId" })
            Lesson.hasMany(models.Exam, { foreignKey: "lessonId" })
        }
    }
    Lesson.init({
        // id: DataTypes.STRING,khong can khai bao id
        lessonTitle: DataTypes.STRING,
        lessonType: DataTypes.STRING,
        courseId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Lesson',
    });
    return Lesson;
};