'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Skill.hasMany(models.Exam, { foreignKey: "skillId" })
            // Skill.hasMany(models.LessonSkill, { foreignKey: "skillId" })
            Skill.belongsTo(models.Lesson, { foreignKey: "lessonId" })
            Skill.hasMany(models.Video, { foreignKey: "skillId" })
            Skill.hasMany(models.Vocabulary, { foreignKey: "skillId" })
            Skill.belongsTo(models.Allcode, { foreignKey: "skillType" })
        }
    }
    Skill.init({
        // id: DataTypes.STRING,khong can khai bao id
        skillType: DataTypes.STRING,//v,k,l,r
        skillTitle: DataTypes.STRING,
        lessonId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Skill',
    });
    return Skill;
};