'use strict';
angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin, $state){
  $scope.admin={};
	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};
  $scope.admins={};

  //admin signup
  $scope.signup=function(){
    Admin.signup($scope.admin).then(function(resp){
      $location.path('/AdminSignin');
    })
  };

  //admin sign in
  $scope.signin=function(){
    Admin.signin($scope.admin).then(function(resp){
      //save the token and admin name in local stoarage to distinguish signed in users
      $window.localStorage.setItem('com.zarad', resp.token);
      $window.localStorage.setItem('com.user', resp.user);
       $location.path('/AdminAction')
    })
  };

  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
  	.then(function(resp){
      console.log(resp.data);
      $location.path('/clubprofile/'+resp.data.username);
    });
  };

  //get a list of all admins
  $scope.getAdmins =function () {
    Admin.getAdmins()
    .then(function (admins) {
      $scope.admins.data = admins;
    });
  };
  $scope.getAdmins();

  //delete admin function
  $scope.deleteAdmin = function () {
    Admin.deleteAdmin({username:$scope.adminSelect})
    .then(function (admin) {
      $scope.getAdmins();
    });
  };
});
