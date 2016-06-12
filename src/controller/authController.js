// var logger = require('log4js').getLogger();

var authManager = require("../services/authManager.js");
// var usersManager = require("../services/users/usersManager.js");
// var authManager = require("../services/auth/authManager.js");
// var contactsManager = require("../services/contacts/contactsManager.js");
// var circlesManager = require("../services/circles/circlesManager.js");
// var mediaManager = require("../services/media/mediaManager.js");
// var eventsManager = require("../services/events/eventsManager.js")
// var collaborationsManager = require("../services/collaborations/collaborationsManager.js")

// var guard = require("../services/signinGuard.js");
var self;

/**
 * AuthController
 * Description: Constructor of authController
 * @param none
 */
var authController = function () {
    self = this;
};

/**
 * Login User
 * Description: Login request for user
 * @param {HTTP request} request
 * @param {HTTP response} response
 */
authController.prototype.login = function (request, response) {
    console.log("Enter API login function");
    var auth = new authManager();
    var callback = function (error, response) {
        if (error || response === null) {
            response.status(500).send({
                status: "failure",
                message: error
            });
            return;
        }
        console.log(response.user);
        response.json({
            data: response.user,
            status: "success"
        });
    };
    try {
        auth.login(request, response, callback);
    } catch (e) {

    }
};

// Exporting controller instance
module.exports.getInstance = function () {
    return new authController();
};