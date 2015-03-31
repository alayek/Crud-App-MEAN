var myApp = angular.module('myApp', []);
myApp.controller('AppControl', ['$scope', '$http', function($scope, $http){
  console.log("Hello World from Controller");
}])