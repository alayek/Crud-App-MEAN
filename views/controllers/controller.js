var myApp = angular.module('myApp', []);
myApp.controller('AppControl', ['$scope', '$http', function($scope, $http){
  console.log("Hello World from Controller");
  // route for the data
  // essentially, raise a request for the path
  $http.get('/contactList').success(function(response){
    console.log("Received data successfully");
    $scope.contactList = response;
  });
  
}])