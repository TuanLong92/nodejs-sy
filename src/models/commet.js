
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.Video, { foreignKey: "videoId" })
            Comment.belongsTo(models.User, { foreignKey: "userId" })
        }
    }
    Comment.init({
        // id: DataTypes.STRING,khong can khai bao id
        userId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        createdTime: DataTypes.DATE,
        videoId: DataTypes.INTEGER


    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};