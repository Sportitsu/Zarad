angular.module('zarad.user',['ionic'])
.controller('UserProfileController', function($scope, Auth, $location, $window, $ionicPlatform){
 console.log($window.localStorage.getItem('com.user'));
 console.log($window.localStorage.getItem('com.zarad'));
});