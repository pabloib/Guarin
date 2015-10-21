angular.module('starter.services', ['ngResource'])
.factory('Login', function ($resource) {
    return $resource('http://localhost:5000/login/:loginId');
});