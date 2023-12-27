
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Document extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Document.belongsTo(models.Video, { foreignKey: "videoId" })
        }
    }
    Document.init({
        // id: DataTypes.STRING,khong can khai bao id
        fileDocument: DataTypes.TEXT,
        videoId: DataTypes.INTEGER,
        description: DataTypes.TEXT


    }, {
        sequelize,
        modelName: 'Document',
    });
    return Document;
};