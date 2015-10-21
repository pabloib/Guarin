angular.module('starter.controllers', ['starter.services', 'firebase'])
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

  // Signup
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
    var ref = new Firebase("https://guarinco.firebaseio.com");
    ref.createUser({
      username : $scope.signupData.username,
      email : $scope.signupData.email,
      password : $scope.signupData.password
    }, function(error, userData){
      if(error){
        console.log("Error al crear usuario", error);
      }else{
        console.log("Usuario creado:", userData.uid);
      }
    })
    $scope.signupData = "";
   };


  // login
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var ref = new Firebase("https://guarinco.firebaseio.com");
    ref.authWithPassword({
      email : $scope.loginData.username,
      password : $scope.loginData.password
    }, function(error, authData){
      if (error){
        console.log("Login Failed", error);
      }else{
        console.log("Authenticated successfully with payload:", authData);
      }
    })
    $scope.loginData = "";
  };



})

  // Items
.factory('Items', function($firebaseArray) {
  var itemsRef = new Firebase("https://guarinco.firebaseio.com/guaro");
  return $firebaseArray(itemsRef);
})

.controller("OrderCtrl", function($scope, Items){
  $scope.items = Items;
  $scope.addItem = function(){
    var Guaro = 1;
    if(Guaro){
      $scope.items.$add({
        "Guaro": +1
      });
    }
  }
})

//Maps
.controller('MarkerRemoveCtrl', function($scope, $ionicLoading){
  $scope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
    $scope.positions = [];
    $ionicLoading.show({
      template: 'Loading...'
    });
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });
  };
})


.controller('LoginCtrl', function($scope, Login) {
    $scope.login = Login.query();
})

.controller('SignupCtrl', function($scope, Signup) {
    $scope.signup = Signup.query();
})
