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
	  		//save the token and username in local stoarage to distinguish signed in users
			$window.localStorage.setItem('com.zarad', resp.token);
			$window.localStorage.setItem('com.user', resp.user);
			console.log(resp);
			$location.path('/AdminMain')
	  	}).catch(function(error){
	  		console.error(error);
	  	});
  };
})