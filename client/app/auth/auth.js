angular.module('zarad.auth',[])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
			$window.localStorage.setItem('com.zarad',resp.token)
		})
	}
	$scope.signin =function(){
  	Auth.signin($scope.user)
  	.then(function(token){
  		console.log()
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});
