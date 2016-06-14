var app = angular.module('BiddingApp', ['ngRoute', 'ngStorage', 'ui.bootstrap']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	    when('/login', {templateUrl: 'js/templates/login.html',   controller: "LoginCtrl", controllerAs: 'vm'}).
	    when('/home', {templateUrl: 'js/templates/home.html',   controller: "HomeCtrl", controllerAs: 'vm'}).
	    otherwise({redirectTo: '/login'});
}]);

app.controller('HomeCtrl', function($scope, $location, $http, socket, $localStorage, $sessionStorage){
  var vm = this;
  // // var username = 'testUser'+Math.random(); //random username
  // // $localStorage.logged_in_username = username;

  // alert($localStorage.logged_in_username);
  vm.user_id = $localStorage.user_id;
  alert(vm.user_id);
  vm.username = $localStorage.logged_in_username;
  vm.invantories = [];
  vm.coins = 0;
  // console.log(vm.invantories);

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
      });
  }();

  socket.on('connect', function(data) {
      socket.emit('join', { username: vm.username});
  });
  socket.on('messages', function(data) {
    // alert(data);
  });

  $scope.$watch(function () { return $localStorage.logged_in_username; },function(newVal,oldVal){
    if(oldVal!==newVal){
       console.log("Redirecting :  Old_val: "+oldVal+"   new_val: "+newVal +" New user ********");
       $location.path( "/login" );
    }
  });

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