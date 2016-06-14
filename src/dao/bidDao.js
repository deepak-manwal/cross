var models  = require('../models');

var self;
var bidDao = function () {
    self = this;
};

bidDao.prototype.create = function (user_id, invantory_id, quantity, min_amount,response, callback) {
  models.bid.create({
      invantory_id: invantory_id,
      user_id: user_id,
      min_amount: min_amount,
      quantity: quantity
  }).then(function (bid) {
  	self.get(bid.id, response, callback);
  }).catch(function (error) {
      console.log(error);
  });
};

bidDao.prototype.get = function (bid_id, response, callback) {
	models.bid.find({
		include:[{
      model: models.invantory,
      include: models.item
    }, models.user],
		where:{
			id: bid_id,
			running: true
		}
	}).then(function(bid){
		if(bid !== null) {
			response.bid = bid;
			callback(null, response);
		} else{
			callback("No running bid found", response);
		}
	});
};

module.exports = bidDao;