'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ResultExam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ResultExam.belongsTo(models.User, { foreignKey: "userId" })
            ResultExam.belongsTo(models.Exam, { foreignKey: "examId" })
        }
    }
    ResultExam.init({
        // id: DataTypes.STRING,khong can khai bao id
        userId: DataTypes.INTEGER,
        examId: DataTypes.INTEGER,
        submittedDate: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ResultExam',
    });
    return ResultExam;
};