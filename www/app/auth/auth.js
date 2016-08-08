'use strict';
angular.module('zarad.auth',['ionic'])
.controller('AuthController',function($scope ,$location, $window , Auth){
	$scope.user={};
	$scope.club={};
	$scope.signup=function(){
		var data=$scope.club;
		Auth.signup(data).then(function(resp){
			console.log(data);
		})
	}

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
		console.log(data);
  	}).catch(function(error){
  		console.error(error);
  	});
  };
})