var env = process.env.NODE_ENV || 'development';
var config = require('../../config.js')[env];
var usersDao = require('../dao/usersDao.js');
var itemsDao = require('../dao/itemsDao.js');
var invantoryDao = require('../dao/invantoryDao.js');
var bidDao = require('../dao/bidDao.js');

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

/**
 * Start auction
 * Description: POST request for starting a auction
 * @param {HTTP request} request
 * @param {HTTP response} response
 * @param {Callback function} callback
 */
userManager.prototype.start_auction = function(request, response, callback) {
    // console.log("userManager login enter"+request.body.username+" =====  "+request.query.username);
    console.log("Enter in start auction");
    var usersDaoObject = new usersDao();
    var itemsDaoObject = new itemsDao();
    var invantoryDaoObject = new invantoryDao();
    var bidDaoObject = new bidDao();

    var user_id = request.params.user_id;
    var invantory_id = request.params.invantory_id;
    var quantity = request.body.quantity;
    var min_amount = request.body.amount;
    console.log("User: "+user_id);
    console.log("Invantory: "+invantory_id);
    console.log("quantity "+quantity);
    console.log("amount: "+min_amount);

    var callbackUser = function(error, response) {
        if(error) {
            console.log("yes found error");
            callback(error, response);
        } else {
            console.log("Avaliable:  "+response.invantory.quantity);
            bidDaoObject.create(user_id, invantory_id, quantity, min_amount, response, callback);
            // invantoryDaoObject.update();
        }
    };
    
    
    try {
        invantoryDaoObject.get(user_id, invantory_id, response, callbackUser);//request.body.username
    } catch (e) {
        
    }
};

module.exports = userManager;