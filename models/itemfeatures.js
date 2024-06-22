'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemFeatures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemFeatures.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    item_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ItemFeatures',
  });
  return ItemFeatures;
};