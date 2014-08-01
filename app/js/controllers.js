'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', '$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL) {
    // Connect $scope.parties to live Firebase data
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');
    $scope.parties = $firebase(partiesRef);
      //pagination
     // $scope.curPage = 0;
     // $scope.pageSize =5;

    // Object to store data from the waitlist form.
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};

    // Function to save a new party to the waitlist.
    $scope.saveParty = function() {
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };
     //pagination feature
    // $scope.numberOfPages = function(){
    //   return Math.ceil($scope.parties.length / $scope.pageSize);
    // }

    // Function to send a text message to a party.
    $scope.sendTextMessage = function(party) {
      var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
      party.notified = 'Yes';
      $scope.parties.$save(party.$id);
    };
  }])
  .controller('AuthController', ['$scope', 'authService', function($scope, authService) {
     //Object bound to inputs on the register and login pages
    $scope.user = {email: '', password: ''};
   // method to register a new user using authService
    $scope.register = function() {
     authService.register($scope.user);
    };
// method to login a  user using authService
    $scope.login = function() {
      authService.login($scope.user);
    };
// method to logout a  user using authService
    $scope.logout = function(){
       authService.logout();
    };
  }])
  .filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
});


