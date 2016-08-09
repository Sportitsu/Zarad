'use strict';
angular.module('zarad.auth',['ionic'])
.controller('AuthController',function($scope ,$location, $window , Auth){
	$scope.user={};
	$scope.club={};
	$scope.signup=function(){
		var data=$scope.club;
		Auth.signup(data).then(function(resp){
			$window.localStorage.setItem('com.zarad', resp.token);
			console.log(data);
		})
	}

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
  			//$window.localStorage.setItem('com.zarad', resp.token);
		console.log(resp);
		$location.path()
  	}).catch(function(error){
  		console.error(error);
  	});
  };
})