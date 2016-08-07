angular.module('zarad.auth',[])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
		})
	}
	
	$scope.signin =function(){
  	Auth.signin($scope.user)
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});
