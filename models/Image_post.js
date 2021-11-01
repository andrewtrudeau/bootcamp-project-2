const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image_post extends Model {}

Image_post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        artist_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        artwork_title:{
            type: DataType.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },

    }
)