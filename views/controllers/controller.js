var myApp = angular.module('myApp', []);
myApp.controller('AppControl', ['$scope', '$http', function($scope, $http){
  // route for the data
  // essentially, raise a request for the path
  $http.get('/contactList').success(function(response){
    $scope.contactList = response;
  });
  
}])