'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WindowItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WindowItem.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    price: DataTypes.NUMBER,
    image: DataTypes.STRING,
    characteristics: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'WindowItem',
  });
  return WindowItem;
};