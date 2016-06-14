var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var usersDao = require('../dao/usersDao.js');
var itemsDao = require('../dao/itemsDao.js');
var invantoryDao = require('../dao/invantoryDao.js');

/**
 * UsersHelper
 * Description: Constructor of usersHelper
 * @param none
 */
var userManager = function () {
    self = this;
};


/**
 * Login
 * Description: POST request for creating user
 * @param {HTTP request} request
 * @param {HTTP response} response
 * @param {Callback function} callback
 */
userManager.prototype.get = function(request, response, callback) {
    console.log("userManager login enter"+request.body.username+" =====  "+request.query.username);
    var usersDaoObject = new usersDao();
    var itemsDaoObject = new itemsDao();
    var invantoryDaoObject = new invantoryDao();
    var user_id = request.params.id;
    console.log(user_id);

    // var callbackUser = function(error, user) {
    //     console.log("Enter in callback user");
    //     //call callback
    // };
    
    
    try {
        usersDaoObject.getUserById(user_id, response, callback);//request.body.username
    } catch (e) {
        
    }
};

module.exports = userManager;