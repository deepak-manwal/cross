var app = angular.module('BiddingApp', ['ngRoute', 'ngAnimate', 'ngStorage', 'ui.bootstrap', 'toaster']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	    when('/login', {templateUrl: 'js/templates/login.html',   controller: "LoginCtrl", controllerAs: 'vm'}).
	    when('/home', {templateUrl: 'js/templates/home.html',   controller: "HomeCtrl", controllerAs: 'vm'}).
	    otherwise({redirectTo: '/login'});
}]);

app.controller('HomeCtrl', function($scope, $location, $http, socket, $localStorage, $sessionStorage, $uibModal, toaster){
  var vm = this;
  // // var username = 'testUser'+Math.random(); //random username
  // // $localStorage.logged_in_username = username;

  // alert($localStorage.logged_in_username);
  vm.user_id = $localStorage.user_id;
  // alert(vm.user_id);
  vm.username = $localStorage.logged_in_username;
  vm.invantories = [];
  vm.coins = 0;
  vm.bid = null;
  vm.timer = 0;//in second
  // console.log(vm.invantories);
  // toaster.success({title: "title", body:"text1"});
  // toaster.error("title", "text2");
  // toaster.pop({type: 'wait', title: "title", body:"text"});
  // toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
  // toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
  // toaster.pop('wait', "title", null, null, 'template');

  vm.startAuctionConfirm = function(invantoryId, currentQuantiy) {
    // alert(id);
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/js/templates/startAuctionModal.html',
      controller: 'AuctionConfrimModalInstanceCtrl',
      size: '',
      controllerAs: 'vm',
      windowClass: 'cb-new-modal'
    });
    // alert(currentQuantiy);
    modalInstance.result.then(function (data) {
      if(currentQuantiy < data.quantity) {
        toaster.error("Opss!!!!", "You don't have this much quantity for auction! Try again with lesser quantity.");
      } else {
        // Starting auction
        alert("Sending socket");
        socket.emit('setCurrentBid', { bid: {
        "id": 1,
        "quantity": 1,
        "min_amount": 1,
        "final_amount": 0,
        "running": true,
        "created_at": "2016-06-14T11:10:17.000Z",
        "updated_at": "2016-06-14T11:10:17.000Z",
        "user_id": 1,
        "invantory_id": 2,
        "invantory": {
            "id": 2,
            "quantity": 1,
            "created_at": "2016-06-14T11:09:49.000Z",
            "updated_at": "2016-06-14T11:09:49.000Z",
            "user_id": 1,
            "item_id": 2,
            "item": {
                "id": 2,
                "name": "Thired",
                "default_quantity": 1,
                "created_at": "2016-06-14T11:09:48.000Z",
                "updated_at": "2016-06-14T11:09:48.000Z"
            }
        },
        "user": {
            "id": 1,
            "username": "test",
            "coins": 1000,
            "created_at": "2016-06-14T11:09:48.000Z",
            "updated_at": "2016-06-14T11:09:48.000Z"
        }
    }});
        // vm.startAuction(invantoryId, data);
      }
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
      console.log("Dismiss");
    });
  };

  vm.startAuction = function(invantoryId, data) {
     var  ajax = $http({
          url: "/user/start_auction/"+vm.user_id+"/"+invantoryId,
          method: 'POST',
          data: data
      });
      ajax.then(function(response) {
        // console.log(response);
        // vm.invantories = response.data.user.invantories;
        // vm.coins = response.data.user.coins;
        vm.bid = response.bid;

        console.log(response);

      },function(response){
          // return false;
      });
  };

  vm.init = function() {
    // Getting user info
    var  ajax = $http({
          url: "/user/"+vm.user_id,
          method: 'GET'
      });
      ajax.then(function(response) {
        console.log(response);
        vm.invantories = response.data.user.invantories;
        vm.coins = response.data.user.coins;
      },function(response){
          // return false;
          $location.path('/login');
      });
  }();

  socket.on('connect', function(data) {
      socket.emit('join', { username: vm.username});
  });
  socket.on('messages', function(data) {
    // alert(data);
  });
  socket.on('changeTimer', function(timer){
    console.log(timer);
    vm.timer = timer;
  });

  socket.on('changeUserTimer', function(timer){
    console.log(timer);
    vm.timer = timer;
  });

  $scope.$watch(function () { return $localStorage.logged_in_username; },function(newVal,oldVal){
    if(oldVal!==newVal){
       console.log("Redirecting :  Old_val: "+oldVal+"   new_val: "+newVal +" New user ********");
       $location.path( "/login" );
    }
  });

});


app.controller('AuctionConfrimModalInstanceCtrl', function ($scope, $uibModalInstance) {
  var vm = this;
  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  vm.ok = function () {
    if (vm.auctionForm.$valid) {
      alert("va;od");
       $uibModalInstance.close({
        quantity: vm.quantity,
        amount: vm.amount
       });
     }else {
      alert("errro");
     }
   
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

/**
* Login controller
*/

app.controller('LoginCtrl', function($http, $location, $localStorage, $sessionStorage){
  var vm = this;
  // vm.test = "su";
  vm.play = function() {
    alert(vm.username);
    if (vm.form.$valid) {
      var  ajax = $http({
          url: "/login",
          method: 'POST',
          data : {username: vm.username}
      });
      return (ajax.then(function(response) {
        // Setting username in local storage
        $localStorage.user_id = response.data.user.id;
        $localStorage.logged_in_username = response.data.user.username; 
        // $localStorage.invantories = response.data.invantories;
        $location.path('/home');
      },function(response){
          // return false;
      }));
    } 
  };
});

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.directive('playerState', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/playerState.html',
    // controller: function ($scope) {
    //   $scope.theme = $scope.theme || 'default';
    // }
  }
});

app.directive('invantory', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/invantory.html',
    // controller: function ($scope) {
    //   $scope.theme = $scope.theme || 'default';
    // }
  }
});

app.directive('currentAuction', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/currentAuction.html',
    // controller: function ($scope) {
    //   $scope.theme = $scope.theme || 'default';
    // }
  }
});