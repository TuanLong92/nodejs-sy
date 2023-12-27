
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vocabulary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Vocabulary.belongsTo(models.Skill, { foreignKey: "skillId" })
        }
    }
    Vocabulary.init({
        // id: DataTypes.STRING,khong can khai bao id
        contentVocabulary: DataTypes.STRING,
        audio: DataTypes.TEXT,
        skillId: DataTypes.INTEGER,
        skillType: DataTypes.STRING


    }, {
        sequelize,
        modelName: 'Vocabulary',
    });
    return Vocabulary;
};