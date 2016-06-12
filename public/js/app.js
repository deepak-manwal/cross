var app = angular.module('BiddingApp', ['ngRoute']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	    when('/login', {templateUrl: 'js/templates/login.html',   controller: "LoginCtrl", controllerAs: 'vm'}).
	    when('/home', {templateUrl: 'js/templates/home.html',   controller: "HomeCtrl", controllerAs: 'vm'}).
	    otherwise({redirectTo: '/login'});
}]);

app.controller('HomeCtrl', function(){

});

app.controller('LoginCtrl', function(user){
  var vm = this;
  // vm.test = "su";
  vm.play = function() {
    if (vm.form.$valid) {
      var  ajax = $http({
          url: "/resendVerificationMail",
          method: 'POST',
          data : {email: userEmailAtSubmit}
      });
      return (ajax.then(function(response) {
          return response.data[0];
      },function(response){
          return false;
      }));
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