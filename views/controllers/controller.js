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
    $http.post('/contactList', $scope.contact).success(function(response){
      // refresh the page to display updated data
      refresh();
      // empty the text-boxes
      $scope.contact = "";
    });
    
  }
  
  $scope.removeContact = function(id){
    console.log(id);
    $http.delete('/contactList/' + id).success(function(response){
      // refresh the page to display updated data
      refresh();
    });
  }
  
  $scope.editContact = function(id){
    $http.get('/contactList/' + id).success(function(response){
      $scope.contact = response;
    });
  }
  
  $scope.updateContact = function(){
    var id = $scope.contact.id;
    $http.put('/contactList/'+id, $scope.contact).success(function(response){
      refresh();
      // empty the text-boxes
      $scope.contact = "";
    })
  }
}])