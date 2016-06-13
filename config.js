module.exports = {
    development: {
        "username": "root",
        "password": "root",
        "database": "bidding",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "timezone": '+05:30',
        "jwtsecret":'proclecollaboration',
        "hostName":"localhost",
        "defaultPort": "3000",
        "defaultInvantoryItems": [{
            name: 'First',
            default_quantity: 10
        }, {
            name: 'Second',
            default_quantity: 5
        }, {
            name: 'Thired',
            default_quantity: 1
        }]
    },
    mac: {
        "username": "root",
        "password": "",
        "database": "bidding",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "timezone": '+05:30',
        "jwtsecret":'proclecollaboration',
        "hostName":"localhost",
        "defaultPort": "8080",
        "defaultInvantoryItems": [{
            name: 'First',
            default_quantity: 10
        }, {
            name: 'Second',
            default_quantity: 5
        }, {
            name: 'Thired',
            default_quantity: 1
        }]
    },
};


