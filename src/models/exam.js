'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Exam.hasMany(models.ResultExam, { foreignKey: "examId" })
            Exam.belongsTo(models.Lesson, { foreignKey: "lessonId" })
            Exam.hasMany(models.TestExcel, { foreignKey: "examId" })
            Exam.belongsTo(models.Skill, { foreignKey: "skillId" })
        }
    }
    Exam.init({
        // id: DataTypes.STRING,khong can khai bao id
        examTitle: DataTypes.STRING,
        contentTest: DataTypes.STRING,
        description: DataTypes.TEXT,
        lessonType: DataTypes.STRING,
        skillId: DataTypes.INTEGER,
        lessonId: DataTypes.INTEGER,
        excelFileTestId: DataTypes.INTEGER,
        skillType: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Exam',
    });
    return Exam;
};