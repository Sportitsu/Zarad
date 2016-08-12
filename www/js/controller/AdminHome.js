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
    Admin.signin({username: $scope.admin.username, password:$scope.admin.password})
    .then(function(resp){
      console.log(resp);
      $location.path('/AdminAction')
    })
  };

  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
  	.then(function(resp){
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
