angular.module('zarad.auth',[])

.controller('AuthController',function($scope, $window, $location,Auth){

	$scope.user = {};

  $scope.signin =function(){
  	Auth.signin($scope.user)
  	.then(function(data){
  		$location.path(data.path);
  	}).catch(function(error){
  		console.error(error);
  	})
  }
})



