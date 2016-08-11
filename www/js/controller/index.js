angular.module('zarad.index',['ionic'])
.controller('parentController',function($scope, $window, Auth){
	//this controller was made for index html page to show and hide logout button
	//depending on user saved token in the localstoarge.
	//signout function
	$scope.initialize = function(){
		$scope.show();
	}
	$scope.logout=function(){
		Auth.signout();
		$scope.show();
	}

	//show logout button when user logout
	$scope.show=function(){
		if(!!$window.localStorage.getItem('com.zarad')){
			return true;
		}else{
			return false;
		}
	}
	//check auth every 10 seconds to show and hide logout button
	$window.setInterval(function(){
		$scope.show();
	},10000)
	$scope.initialize();
})