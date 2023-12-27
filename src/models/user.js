'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, { foreignKey: "positionId", targetKey: "keyMap", as: "positionData" });
      User.belongsTo(models.Allcode, { foreignKey: "gender", targetKey: "keyMap", as: "genderData" });
      User.hasOne(models.Markdown, { foreignKey: "teacherId" })
      User.belongsToMany(models.Course, { through: models.UserCourse, as: "Users-Courses" })
      User.hasMany(models.ResultExam, { foreignKey: "userId" })
      // User.hasMany(models.UserCourse, { foreignKey: "userId" })
      User.hasMany(models.Enrollment, { foreignKey: "userId" })
      User.hasMany(models.Comment, { foreignKey: "userId" })
    }
  }
  User.init({
    // id: DataTypes.STRING,khong can khai bao id
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.BLOB("long"),
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};