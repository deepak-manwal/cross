var userManager = require("../src/services/userManager.js");


var socket = function(client) {  
    console.log('Client connected...');
    var self = this;
    var userManagerObj = new userManager();
    // var self.bidding;
    self.bidder_id = null;
    var timer = 90; // default value
    var userTimer = 90;
    var counter = 0;
    client.on('join', function(user) {
        console.log(user);
        console.log("UserLogged in with in socket with username:    " + user.username);
        if(self.bidding){
        	console.log("BID found***************8");
        	// client.emit('', 'Hello socket from server');
        }
    });

    client.on('setCurrentBid', function(bid){
    	console.log("Found a new bid*************************************************");
    	self.bidding = bid;
    	counterStartNew();
    });

    // client.on('endBid', function(bid){
    //     console.log("Bidsss ending-------------------");
    //     console.log(bid);
    // })

    client.on('updateTimer', function(timer){
        console.log("Updating timer-------------------");

        // timer = timer+10;
        // userTimer = userTimer+10;
    });

    client.on('updateBidding', function(data) {
        console.log("updating bid****************");
        console.log(self.bidding);
        self.bidding = data.bid;
        console.log(self.bidding);

        self.bidder_id = data.user_id;
        console.log("Bidder: "+self.bidder_id);
    });

    function counterStartNew()
    {
        client.broadcast.emit('changeTimer', {timer: --timer,bid: self.bidding});
        client.emit('changeUserTimer', {timer: --userTimer,bid: self.bidding});
        if (timer > 0){
            timer--;
            userTimer--;
            setTimeout(counterStartNew, 1000);
        } else {
          //Ending bidding and updating ammount
          timer = 90;
          userTimer = 90;
          console.log("WHERERERERRRRRRRRRRR");
          console.log(self.bidder_id);
          if(self.bidder_id){
            console.log("********************************************************************")
              userManagerObj.complate_bid(self.bidding, self.bidder_id);
          } else {
            console.log("********************************************************************")
            console.log("No bidding happend");
          }

          self.bidding = null;
          self.bidder_id = null;
          client.broadcast.emit('changeTimer', {timer:0,bid: self.bidding});
          client.emit('changeUserTimer', {timer: 0,bid: self.bidding});
        }
    }

};



module.exports = socket;