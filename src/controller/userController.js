var userManager = require("../services/userManager.js");

var self;

/**
 * userController
 * Description: Constructor of userController
 * @param none
 */
var userController = function () {
    self = this;
};

/**
 * User GET
 * Description: Login request for user
 * @param {HTTP request} request
 * @param {HTTP response} response
 */
userController.prototype.get = function (request, response) {
    var userManagerObj = new userManager();
    var callback = function (error, response) {
        if (error || response === null) {
            response.status(500).send({
                status: "failure",
                message: error
            });
            return;
        }
        response.json({
            user: response.user,
            invantories: response.invantories,
            status: "success"
        });
    };
    try {
        userManagerObj.get(request, response, callback);
    } catch (e) {

    }
};

/**
 * Starting Auction and creating bid
 * Description: Login request for user
 * @param {HTTP request} request
 * @param {HTTP response} response
 */
userController.prototype.start_auction = function (request, response) {
    console.log("start bidding api");
    var userManagerObj = new userManager();
    var callback = function (error, response) {
        if (error || response === null) {
            response.status(500).send({
                status: "failure",
                message: error
            });
            return;
        }
        response.json({
            bid: response.bid,
            invantories: response.invantories,
            status: "success"
        });
    };
    try {
        userManagerObj.start_auction(request, response, callback);
    } catch (e) {

    }
};

/**
 * Login User
 * Description: Login request for user
 * @param {HTTP request} request
 * @param {HTTP response} response
 */
userController.prototype.createAuction = function (request, response) {
    console.log("Enter in createAuction");
    var auth = new authManager();
    var callback = function (error, response) {
        if (error || response === null) {
            response.status(500).send({
                status: "failure",
                message: error
            });
            return;
        }
        response.json({
            user: response.user,
            invantories: response.invantories,
            status: "success"
        });
    };
    try {
        // auth.login(request, response, callback);
    } catch (e) {

    }
};

// Exporting controller instance
module.exports.getInstance = function () {
    return new userController();
};