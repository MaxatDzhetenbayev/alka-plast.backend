'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class create - payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  create - payment.init({
    id: DataTypes.NUMBER,
    payment_intent_id: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    currency: DataTypes.STRING,
    status: DataTypes.STRING,
    payment_method_id: DataTypes.STRING,
    card_brand: DataTypes.STRING,
    card_last: DataTypes.STRING,
    receipt_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'create-payment',
  });
  return create - payment;
};