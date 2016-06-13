var models  = require('../models');

var self;
var invantoryDao = function () {
    self = this;
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

invantoryDao.prototype.getUserInvantory = function (user, callback) {
    models.invantory.findAll({ where : { user_id: user.id }}).then(function(invantories) {
        callback(null, invantories);
    }).catch(function(error) {
        console.log(error);
    });
};

module.exports = invantoryDao;