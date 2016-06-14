var models  = require('../models');

var self;
var invantoryDao = function () {
    self = this;
};


invantoryDao.prototype.get = function (user_id, invantory_id, response, callback) {
  models.invantory.find({where:{
    user_id: user_id,
    id: invantory_id
  }}).then(function(invantory){
    if(invantory){
      response.invantory = invantory;
      callback(null, response);
    } else{
      callback("No invantory found of this author. Please try Again!", response);
    }
  });
};

invantoryDao.prototype.createInitialInvantory = function (items, response, callback) {
    var counter = 0;
    for(i=0; i<items.length; i++){
        counter++;
        models.invantory.create({
            quantity: items[i].default_quantity,
            item_id: items[i].id,
            user_id: response.user.id
        }).then(function (user) {
            counter--;
            if(!counter)
                callback(null, response);
        }).catch(function (error) {
            console.log(error);
        });
    }
};

invantoryDao.prototype.getUserInvantory = function (response, callback) {
    models.invantory.findAll({ include: [models.user], where : { user_id: response.user.id }}).then(function(invantories) {
        response.invantories = invantories;
        callback(null, response);
    }).catch(function(error) {
        console.log(error);
    });
};

module.exports = invantoryDao;