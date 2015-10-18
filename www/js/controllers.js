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
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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
    var ref = new Firebase("https://guarinco.firebaseio.com");
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
    ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
  };

});