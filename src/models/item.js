"use strict";

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('item', { 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    default_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    classMethods: {
      associate: function(models) {
        Item.hasMany(models.invantory, { foreignKey: 'item_id' })
      }
    }
  });
  return Item;
};
