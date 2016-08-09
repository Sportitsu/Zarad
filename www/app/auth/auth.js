'use strict';
angular.module('zarad.auth',[])
.controller('AuthController',function($scope ,$location, $window , Auth){
	$scope.user={};

	$scope.signin =function(){
	var url='';
	if(!!$scope.user.player){
		url='/api/user/signin';
	}
	else if(!!$scope.user.club){
		url='/api/club/signin';
	}
  	Auth.signin($scope.user,url)
  	.then(function(resp){
		$window.localStorage.setItem('com.zarad', resp.token);
		$window.localStorage.setItem('com.user', resp.user);
		$location.path('/AdminMain')
  	}).catch(function(error){
  		console.error(error);
  	});
  };
})