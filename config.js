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
            name: 'Birds',
            default_quantity: 30
        }, {
            name: 'Carrots',
            default_quantity: 18
        }, {
            name: 'Diamond',
            default_quantity: 1
        }],
        default_user_conins: 1000
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
            name: 'Birds',
            default_quantity: 30
        }, {
            name: 'Carrots',
            default_quantity: 18
        }, {
            name: 'Diamond',
            default_quantity: 1
        }],
        default_user_conins: 1000
    },
};


