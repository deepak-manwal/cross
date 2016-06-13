var app = angular.module('BiddingApp', ['ngRoute', 'ngStorage']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	    when('/login', {templateUrl: 'js/templates/login.html',   controller: "LoginCtrl", controllerAs: 'vm'}).
	    when('/home', {templateUrl: 'js/templates/home.html',   controller: "HomeCtrl", controllerAs: 'vm'}).
	    otherwise({redirectTo: '/login'});
}]);

app.controller('HomeCtrl', function($scope, $location, socket, $localStorage, $sessionStorage){
  var vm = this;
  var username = 'testUser'+Math.random(); //random username
  $localStorage.logged_in_username = username;

  alert($localStorage.logged_in_username);

  socket.on('connect', function(data) {
      socket.emit('join', { username: username});
  });
  socket.on('messages', function(data) {
    // alert(data);
  });

  $scope.$watch(function () { return $localStorage.logged_in_username; },function(newVal,oldVal){
    // console.log("Old_val: "+oldVal+"   new_val: "+newVal);
    if(oldVal!==newVal){
       console.log("Redirecting :  Old_val: "+oldVal+"   new_val: "+newVal +" New user ********");
       $location.path( "/login" );
    }
  })

});

app.controller('LoginCtrl', function(){
  var vm = this;
  // vm.test = "su";
  // vm.play = function() {
  //   if (vm.form.$valid) {
  //     var  ajax = $http({
  //         url: "/resendVerificationMail",
  //         method: 'POST',
  //         data : {email: userEmailAtSubmit}
  //     });
  //     return (ajax.then(function(response) {
  //         return response.data[0];
  //     },function(response){
  //         return false;
  //     }));
  //   } 
  // };
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

// app.directive('userCard', function () {
//     return {
//       restrict: 'E',
//       templateUrl: 'js/template/	userCard.tmpl.html',
//       scope: {
//         name: '@',
//         theme: '@'
//       },
//       controller: function ($scope) {
//         $scope.theme = $scope.theme || 'default';
//       }
//     }
//   });