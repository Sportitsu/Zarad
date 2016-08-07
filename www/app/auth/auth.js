angular.module('zarad.auth',['ionic'])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.club={};
	$scope.signup=function(){
		var data=$scope.club;
		Auth.signup(data).then(function(resp){
			console.log(data);
		})
	}
	
	$scope.signin =function(){
	var url="";
	if(!!$scope.user.player){
		url="/api/user/signin"
	}
	else if(!!$scope.user.club){
		url="/api/club/signin"
	}
  	Auth.signin($scope.user,url)
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});