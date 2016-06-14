"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', { 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    classMethods: {
      associate: function(models) {
        User.hasMany(models.invantory, { foreignKey: 'user_id' });
        User.hasMany(models.bid, { foreignKey: 'user_id' });
        // User.hasMany(models.group_circle_has_contact, { foreignKey: 'contact_user_id'}),
        // User.hasMany(models.event_calendar, { foreignKey: 'owner_id'}),
        // User.hasMany(models.library, { foreignKey: 'owner_id'}),
        // User.hasMany(models.event_calendar_has_circle, { foreignKey: 'private_circle_id'}),
        // User.hasMany(models.library_permission, { foreignKey: 'private_circle_id' }),
        // User.hasMany(models.notification, { foreignKey: 'user_id' }),
        // User.hasMany(models.collaboration, { foreignKey: 'owner_id' }),
        // User.hasMany(models.collaboration_has_user, { foreignKey: 'user_id' })
      }
    }
  });
  return User;
};
