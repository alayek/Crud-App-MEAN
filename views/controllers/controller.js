var myApp = angular.module('myApp', []);
myApp.controller('AppControl', ['$scope', '$http', function($scope, $http){
  // route for the data
  // essentially, raise a request for the path
  var refresh = function(){
    $http.get('/contactList').success(function(response){
      $scope.contactList = response;
    });
  }
  
  refresh();
  
  // add the click functionality
  $scope.addContact = function(){
    $http.post('/contactList', $scope.contact);
    // refresh the page to display updated data
    refresh();
  }
}])