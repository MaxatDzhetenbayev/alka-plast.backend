'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestDetails.init({
    status: DataTypes.STRING,
    instalation_date: DataTypes.DATE,
    request_id: DataTypes.NUMBER,
    item_id: DataTypes.NUMBER,
    options: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'RequestDetails',
  });
  return RequestDetails;
};