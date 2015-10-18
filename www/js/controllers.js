angular.module('starter.controllers', ['starter.services'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(sig) {
    $scope.sig = sig;
  });

   $scope.signup = function() {
     $scope.sig.show();
   };

   $scope.doSignup = function() {
    console.log('Doing signup', $scope.signupData);
   };



  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
  };
})


.controller('LoginCtrl', function($scope, Login) {
    $scope.login = Login.query();
})

.controller('SignupCtrl', function($scope, Signup) {
    $scope.signup = Signup.query();
})

