// var _ = require('underscore');
// var logger = require('log4js').getLogger();
// var bcrypt = require('bcrypt');

//var commonController = require('../controllers/commonController.js');
var usersDao = require('../dao/usersDao.js');
// var accountsDao = require('../accounts/accountsDao.js');
// var validator = require("../validatorServicesManager.js");
// var common = require("../commonServicesManager");

/**
 * UsersHelper
 * Description: Constructor of usersHelper
 * @param none
 */
var authManager = function () {
    self = this;
};

/*****************  API function (Must not call from any controller except apiController)  **************/

/**
 * Login
 * Description: POST request for creating user profile
 * @param {HTTP request} request
 * @param {HTTP response} response
 * @param {Callback function} callback
 */
authManager.prototype.login = function(request, response, callback) {
    console.log("AuthManager login enter"+request.body.username+" =====  "+request.query.username);
    var usersDaoObject = new usersDao();
    
    var callbackUser = function (user, first_time_user) {
        console.log("Enter in callback Manager");
        response.user = user;
        // console.log(user);
        if(first_time_user) {
            console.log("Yooo new user "+user.username);
            // Creating invantory items for new user
            
            callback(null, response);
            // TBD

        } else {
            // callback(user);
            // Get user invantory details here
            callback(null, response);
            // TBD
        }
    };
    
    try {
        usersDaoObject.findUserOrCreate(request.query.username, callbackUser);//request.body.username
    } catch (e) {
        
    }
};

module.exports = authManager;