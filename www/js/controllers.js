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

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    id: '1',
    scope: $scope
  }).then(function(modal) {
    $scope.oModal1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    id: '2',
    scope: $scope
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });
  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.oModal1.hide();
  // };
  $scope.closeLogin = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };
  // Open the login modal
  // $scope.login = function() {
  //   $scope.oModal1.show();
    
  // };  

  $scope.login = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var ref = new Firebase("https://guarinco.firebaseio.com");
    ref.authWithPassword({
        email    : $scope.loginData.username,
        password : $scope.loginData.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  ////////////////////////
  $scope.doSign_up = function() {
    console.log('Doing login', $scope.loginData);
    var ref = new Firebase("https://guarinco.firebaseio.com");
    ref.createUser({
      email: $scope.loginData.username,
      password : $scope.loginData.password,
      cellphone: $scope.loginData.cellphone
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  ///////////////////////

})

////////


///////





// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })


.controller('MarkerRemoveCtrl', function($scope, $ionicLoading) {

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


    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });

  };

})




.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})
// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
})
.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://guarinco.firebaseio.com");
  return $firebaseArray(itemsRef);
})

// .controller('SignupCtrl', function($scope, Items){
//   $scope.items = Items;
//   $scope.createUser=function(){
//     email    :  $scope.loginData.username,
//     password :  $scope.loginData.password
//   }
// })

.controller('SignupCtrl', function($scope, Items){
  var ref = new Firebase("https://guarinco.firebaseio.com");
  $scope.createUser=function(){ 
    ref.createUser({
    email    : loginData.username,
    password : loginData.password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });};
 
})


.controller("OrderCtrl", function($scope, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = 1;
    if (name) {
      $scope.items.$add(
      {
        "name": +1
      });

    }
    // var ref = new Firebase("https://guarinco.firebaseio.com");
    // ref.createUser({
    //   email    : "bobtowny@firebase.com",
    //   password : "correcthorsebatterystaple"
    // }, function(error, userData) {
    //   if (error) {
    //     console.log("Error creating user:", error);
    //   } else {
    //     console.log("Successfully created user account with uid:", userData.uid);
    //   }
    // });
//     ref.authWithPassword({
//   email    : "bobtony@firebase.com",
//   password : "correcthorsebatterystaple"
// }, function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });
  };



});