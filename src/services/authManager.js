// var _ = require('underscore');
// var logger = require('log4js').getLogger();
// var bcrypt = require('bcrypt');

//var commonController = require('../controllers/commonController.js');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var usersDao = require('../dao/usersDao.js');
var itemsDao = require('../dao/itemsDao.js');
var invantoryDao = require('../dao/invantoryDao.js');
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
 * Description: POST request for creating user
 * @param {HTTP request} request
 * @param {HTTP response} response
 * @param {Callback function} callback
 */
authManager.prototype.login = function(request, response, callback) {
    console.log("AuthManager login enter"+request.body.username+" =====  "+request.query.username);
    var usersDaoObject = new usersDao();
    var itemsDaoObject = new itemsDao();
    var invantoryDaoObject = new invantoryDao();


    var callbackCreateDefaultInvantory = function(error, items) {
        console.log("Enter in create default invantory");
        invantoryDaoObject.createInitialInvantory(items, response, callback);
    }

    var callbackCheckDefaultItems = function(error, items) {
        console.log("Enter in callbackCheckDefaultItems");
        console.log(items.length);
        if(items.length === 0) { // Default Items not present in system, Need to sync from config
            console.log(config.defaultInvantoryItems);
            var counter = 0;
            for(i=0; i<config.defaultInvantoryItems.length;i++){
                var callbackTemp = function(error, item){
                    counter--;
                    console.log("Item Created: "+item.id);
                    if(!counter) // Processing Done
                        itemsDaoObject.getAll(callbackCreateDefaultInvantory);
                }
                counter++;
                itemsDaoObject.add(config.defaultInvantoryItems[i].name, config.defaultInvantoryItems[i].default_quantity, callbackTemp);
            }
        }
    };
    
    var callbackUser = function (user, first_time_user) {
        console.log("Enter in callback Manager");
        response.user = user;
        // console.log(user);
        if(first_time_user) {
            console.log("Yooo new user "+user.username);
            // Creating invantory items for new user
            // invantoryDao.create();
            
            // callback(null, response);
            // TBD
            itemsDaoObject.getAll(callbackCheckDefaultItems);

        } else {
            // callback(user);
            // Get user invantory details here
            callback(null, response);
            // TBD
        }
    };
    
    try {
        usersDaoObject.findUserOrCreate(request.body.username, callbackUser);//request.body.username
    } catch (e) {
        
    }
};

module.exports = authManager;