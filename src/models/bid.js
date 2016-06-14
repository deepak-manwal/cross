"use strict";

module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('bid', { 
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    final_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    running: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.user, { foreignKey: 'user_id' });
        Bid.belongsTo(models.invantory, { foreignKey: 'invantory_id' });
      }
    }
  });
  return Bid;
};
