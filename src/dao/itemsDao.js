var models  = require('../models');

var self;
var itemsDao = function () {
    self = this;
};

itemsDao.prototype.add = function (item_name, default_quantity, callback) {
    models.item.create({
        name: item_name,
        default_quantity: default_quantity
    }).then(function (item) {
        callback(null, item);
    }).catch(function (error) {
        console.log(error);
    });
};

itemsDao.prototype.getAll = function(callback) {
    models.item.findAll().then(function(items) {
        callback(null, items);
    }).catch(function(error) {
        console.log(error);
    });
};

module.exports = itemsDao;