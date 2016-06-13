var models  = require('../models');

var self;
var usersDao = function () {
    self = this;
};

usersDao.prototype.findUserOrCreate = function (username, callback) {
    models.user.find({where: {
            username: username
        }})
        .then(function (user) {
            if(user !== null) {
                /* user found*/
                callback(user);
            } else {
                var first_time_user = true;
                models.user.create({ username: username }).then(function (user) {
                    callback(user, first_time_user);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
};

// usersDao.prototype.getUserById = function (userId, callback) {
//     models.user.find({where: {
//             id: userId,
//             active_flag: true,
//             delete_flag: false
//         }})
//         .then(function (user) {
//             if(user != null) {
//                 /* user found*/
//                 callback(null, user.dataValues);
//             } else {
//                 /*User not found*/
//                 callback("No user found", null)
//             }
//         });
// };

// usersDao.prototype.create = function (user, callback) {
//     models.user.find({ where: {email: user.email}}).then(function(res){
//         if(res) {
//             callback("Email already registerd", null);
//         } else {
//             models.user.create(user).then(function (user) {
//                 callback(null, user);
//             }).catch(function (error) {
//                 logger.error(error);
//             });
//         }
//     });
// };

module.exports = usersDao;