var models  = require('../models');

var self;
var usersDao = function () {
    self = this;
};

usersDao.prototype.findUserOrCreate = function (username, coins, callback) {
    models.user.find({where: {
            username: username
        }})
        .then(function (user) {
            if(user !== null) {
                /* user found*/
                callback(user);
            } else {
                var first_time_user = true;
                models.user.create({
                    username: username,
                    coins: coins
                }).then(function (user) {
                    callback(user, first_time_user);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
};

usersDao.prototype.getUserById = function (userId, response, callback) {
    models.user.find({
        include: [{
            model: models.invantory,
            include: models.item
        }],
        where: {
            id: userId
        }
    })
        .then(function (user) {
            if(user !== null) {
                /* user found*/
                response.user = user;
                callback(null, response);
            } else {
                /*User not found*/
                callback("No user found", response);
            }
        });
};

usersDao.prototype.reduceCoin = function (bid, bidder_id) {
    console.log(bid);

    console.log("herer*********")
    models.user.find({ where: {
        id: bidder_id
    } }).then(function(user) {
      if (user) {
        user.updateAttributes({
          coins: user.coins - bid.final_amount
        }).then(function() {
            console.log("User conin reduced updated +"+bidder_id);
        });
      }
    })
};

usersDao.prototype.increaseCoin = function (bid) {
    console.log("herer*********")
    models.user.find({ where: {
        id: bid.user.id
    } }).then(function(user) {
      if (user) {
        user.updateAttributes({
          coins: user.coins + bid.final_amount
        }).then(function() {
            console.log("User conin added updated +"+bid.user.id);
        });
      }
    })
};

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