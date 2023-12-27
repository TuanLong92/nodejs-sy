'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserCourse.belongsTo(models.User, { foreignKey: "userId" })
            UserCourse.belongsTo(models.Course, { foreignKey: "courseId" })
        }
    }
    UserCourse.init({
        // id: DataTypes.STRING,khong can khai bao id
        userId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'UserCourse',
    });
    return UserCourse;
};