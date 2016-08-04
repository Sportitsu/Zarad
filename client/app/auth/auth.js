angular.module('zarad.auth',[])

.controller('AuthController',function($scope , $window , Auth){
	$scope.user={};
	$scope.signup=function(){
		Auth.signup().then(function(resp){
			$window.localStorage.setItem('com.zarad',resp.token)
		})
	}
<<<<<<< HEAD
=======
  
>>>>>>> df28f63906822524bac2a8509f49c87e7558ea45
	$scope.signin =function(){
  	Auth.signin($scope.user)
  	.then(function(data){
  		$location.path(data.path);
  	}).catch(function(error){
  		console.error(error);
  	})
  }
});
