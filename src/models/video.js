
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Video.belongsTo(models.Skill, { foreignKey: "skillId" })
            Video.hasMany(models.Document, { foreignKey: "videoId" })
            Video.hasMany(models.Comment, { foreignKey: "videoId" })
        }
    }
    Video.init({
        // id: DataTypes.STRING,khong can khai bao id
        videoName: DataTypes.STRING,
        contentVideo: DataTypes.TEXT,
        description: DataTypes.TEXT,
        skillId: DataTypes.INTEGER,
        skillType: DataTypes.STRING


    }, {
        sequelize,
        modelName: 'Video',
    });
    return Video;
};