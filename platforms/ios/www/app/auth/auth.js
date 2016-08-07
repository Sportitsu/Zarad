angular.module('zarad.auth',[])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
		})
	}
	
	$scope.signin =function(){
  	Auth.signin($scope.user)
<<<<<<< HEAD
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
=======
<<<<<<< HEAD
<<<<<<< HEAD:client/app/auth/auth.js
  	.then(function(token){
  		//$location.path(data.path);
=======
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
>>>>>>> 5188d08d33f631bf868f85cb736047a544adcb7f:platforms/ios/www/app/auth/auth.js
=======
  	.then(function(data){
		$window.localStorage.setItem('com.zarad',data.token);
		$location.path(data.path);
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
>>>>>>> 9b966bbbf968c4d42b90468c898ede8fcf71797a
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});
