
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Enrollment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Enrollment.belongsTo(models.User, { foreignKey: "userId" })
            Enrollment.belongsTo(models.Course, { foreignKey: "courseId" })
        }
    }
    Enrollment.init({
        // id: DataTypes.STRING,khong can khai bao id
        userId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
        enrollmentDate: DataTypes.DATE,
        progress: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Enrollment',
    });
    return Enrollment;
};