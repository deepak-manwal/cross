module.exports = function(client) {  
    console.log('Client connected...');

    client.on('join', function(user) {
        console.log(user);
        console.log("UserLogged in with in socket with usernames:    " + user.username);
        client.emit('messages', 'Hello socket from server');
    });
}