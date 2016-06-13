"use strict";

module.exports = function(sequelize, DataTypes) {
  var Invantory = sequelize.define('invantory', { 
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    classMethods: {
      associate: function(models) {
        Invantory.belongsTo(models.user, { foreignKey: 'user_id' }),
        Invantory.belongsTo(models.item, { foreignKey: 'item_id' })
      }
    }
  });
  return Invantory;
};