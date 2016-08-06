angular.module('zarad.auth',[])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
		})
	}
	
	$scope.signin =function(){
  	Auth.signin($scope.user)
<<<<<<< HEAD:client/app/auth/auth.js
  	.then(function(token){
  		//$location.path(data.path);
=======
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
>>>>>>> 5188d08d33f631bf868f85cb736047a544adcb7f:platforms/ios/www/app/auth/auth.js
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});
