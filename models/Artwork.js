const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artwork extends Model { }

Artwork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    comments: {
      type: DataTypes.STRING,
      defaultValue: "[]",
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue('comments'));
      },
      set: function (val) {
        return this.setDataValue('comments', JSON.stringify(val));
      }
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'artwork',
  }
);

module.exports = Artwork;
