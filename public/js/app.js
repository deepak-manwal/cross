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

  vm.user_id = $localStorage.user_id;
  vm.username = $localStorage.logged_in_username;
  vm.invantories = [];
  vm.coins = 0;
  vm.bid = null;
  vm.timer = 0;//in second

  vm.startAuctionConfirm = function(invantoryId, currentQuantiy) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/js/templates/startAuctionModal.html',
      controller: 'AuctionConfrimModalInstanceCtrl',
      size: '',
      controllerAs: 'vm',
      windowClass: 'cb-new-modal'
    });
    modalInstance.result.then(function (data) {
      if(currentQuantiy < data.quantity) {
        toaster.error("Opss!!!!", "You don't have this much quantity for auction! Try again with lesser quantity.");
      } else {
        // Starting auction
        vm.startAuction(invantoryId, data);
      }
    }, function () {
      console.log("Dismiss");
    });
  };

  vm.logout = function(){
    $localStorage.$reset();
    $location.path('/login');
  };

  vm.startAuction = function(invantoryId, data) {
     var  ajax = $http({
          url: "/user/start_auction/"+vm.user_id+"/"+invantoryId,
          method: 'POST',
          data: data
      });
      ajax.then(function(response) {
        vm.bid = response.data.bid;
        socket.emit('setCurrentBid', response.data.bid);

      },function(response){
          // return false;
      });
  };

  vm.placeBid = function(){
    if(vm.auctionForm.$valid) {
      vm.bid.final_amount = vm.amount;
      vm.amount = '';
      socket.emit('updateBidding', {bid: vm.bid, user_id: vm.user_id});
    }
  }

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
          $location.path('/login');
      });
  };

  vm.init();

  socket.on('connect', function(data) {
      socket.emit('join', { username: vm.username});
  });


  socket.on('changeTimer', function(data){
    // console.log(data);
    vm.timer = data.timer;
    vm.bid = data.bid;
    if(vm.bid === null){
      toaster.pop({
          type: 'success',
          title: 'Bidding completed',
          body: 'Success bidding ended. Invantory and coins will be updated soon of winner and seller',
          showCloseButton: true
      });
      vm.init();
    }
  });

  // socket.on('updateBidding', function(bid){
  //   console.log()
  // })

  socket.on('changeUserTimer', function(data){
    vm.timer = data.timer;
    vm.bid = data.bid;
    if(vm.bid === null){
      toaster.pop({
          type: 'success',
          title: 'Bidding completed',
          body: 'Success bidding ended. Invantory and coins will be updated soon of winner and seller',
          showCloseButton: true
      });
      vm.init();
    }
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

  vm.ok = function () {
    if (vm.auctionForm.$valid) {
      // alert("va;od");
       $uibModalInstance.close({
        quantity: vm.quantity,
        amount: vm.amount
       });
     }else {
      // alert("errro");
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
  vm.play = function() {
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
  }
});

app.directive('invantory', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/invantory.html',
  }
});

app.directive('currentAuction', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/currentAuction.html',
  }
});