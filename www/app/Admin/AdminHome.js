'use strict';
angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin, $state){
  $scope.admin={};
	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};

  //admin signup
  $scope.signup=function(){
    Admin.signup($scope.admin).then(function(resp){
      $location.path('/AdminSignin');
    })
  }

  //admin sign in
  $scope.signin=function(){
    Admin.signin($scope.admin).then(function(resp){
      $window.localStorage.setItem('com.zarad', resp.token);
      $window.localStorage.setItem('com.user', resp.user);
      console.log(resp);
      //$state.go('AdminAction');
       $location.path('/AdminAction')
    })
  }

  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
  	.then(function(resp){
      console.log(resp.data);
      $location.path('/clubProfile');
    });
  };

  //add tournament function
  $scope.Addtournament =function(){
    Admin.Addtournament($scope.tournament)
    .then(function (res) {
       console.log(res);
      });
  };
});
