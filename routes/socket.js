var socket = function(client) {  
    console.log('Client connected...');
    var bidding;
    var timer = 60; // default value
    var userTimer = 60;
    var counter = 0;
    client.on('join', function(user) {
        console.log(user);
        console.log("UserLogged in with in socket with username:    " + user.username);
        if(bidding){
        	console.log("BID found***************8");
        	// client.emit('', 'Hello socket from server');
        }
    });

    client.on('setCurrentBid', function(bid){
    	console.log("Found a new bid*************************************************");
    	bidding = bid;
    	counterStart(timer);
    });

    function counterStart(timer) {
		   // console.trace();
		   console.log("Starting timer*******************************************")
		   	for(x=0; x<timer; x++) {
		   		setTimeout(function(){
		   		client.broadcast.emit('changeTimer', --timer);
		   		client.emit('changeUserTimer', --usertimer);
			   	}, 1000 * x);
		   }
		}

};



module.exports = socket;