
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.belongsToMany(models.User, { through: models.UserCourse, as: "Course-Users" })
            Course.hasMany(models.Lesson, { foreignKey: "courseId" })
            // Course.hasMany(models.UserCourse, { foreignKey: "courseId" })
            Course.belongsTo(models.Allcode, { foreignKey: "courseLevel" })
            Course.hasMany(models.Enrollment, { foreignKey: "courseId" })
        }
    }
    Course.init({
        // id: DataTypes.STRING,khong can khai bao id
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        createdBy: DataTypes.STRING,
        otherCourseDetail: DataTypes.TEXT,
        courseLevel: DataTypes.STRING,//N5, N4
        numberOfVideo: DataTypes.STRING,
        numberOfExam: DataTypes.STRING,
        numberOfFlashCard: DataTypes.STRING,
        numberOfLearnedVideo: DataTypes.STRING,
        numberOfLearnedExam: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};