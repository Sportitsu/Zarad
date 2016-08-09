angular.module('zarad.index',['ionic'])
.controller('parentController',function($scope, $window, Auth){
	
	//signout function
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
	//check auth every half minutes to show and hide logout button
	$window.setInterval(function(){
		$scope.show();
	},5000)
})