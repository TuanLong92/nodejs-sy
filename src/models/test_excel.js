
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TestExcel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TestExcel.belongsTo(models.Exam, { foreignKey: "examId" })
        }
    }
    TestExcel.init({
        // id: DataTypes.STRING,khong can khai bao id
        lessonName: DataTypes.STRING,
        lessonType: DataTypes.STRING,
        courseLevel: DataTypes.STRING,
        skillType: DataTypes.STRING,//V,K,L,R
        questionImage: DataTypes.STRING,
        question: DataTypes.STRING,
        answer1: DataTypes.STRING,
        answer2: DataTypes.STRING,
        answer3: DataTypes.STRING,
        answer4: DataTypes.STRING,
        corectAnswer: DataTypes.STRING,
        examId: DataTypes.INTEGER


    }, {
        sequelize,
        modelName: 'TestExcel',
    });
    return TestExcel;
};