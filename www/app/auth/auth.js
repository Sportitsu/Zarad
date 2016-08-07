'use strict';
angular.module('zarad.auth',['ionic'])
.controller('AuthController',function($scope ,$location, $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
			console.log(resp);
		});
	};
	
	$scope.signin =function(){
	var url='';
	if($scope.user.type=== 'player'){
		url='/api/user/signin';
	}
	else if($scope.user.type=== 'club'){
		url='/api/club/signin';
	}
  	Auth.signin($scope.user,url)
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
  	}).catch(function(error){
  		console.error(error);
  	});
  };
});