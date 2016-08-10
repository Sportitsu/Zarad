'use strict';
angular.module('zarad.auth',[])
.controller('AuthController',function($scope ,$location, $window , Auth, $ionicPopup){

     $scope.user={};
	 $scope.showAlert = function(type, tx) {
	   var alertPopup = $ionicPopup.alert({
	     title: type,
	     text : tx

	 });
	   alertPopup.then(function(res) {
	     console.log('Thank you for helping us fix that ' + type);
	   });
	 };

	$scope.signin =function(){
		if(!$scope.user.player && !$scope.user.club){
			return $scope.showAlert('Missing Radio Button');
		}
		if(!$scope.user.username){
			return $scope.showAlert('Missing Username Field');
		} else if(!$scope.user.password){
			return $scope.showAlert('Missing Password Field')
		}

		var url='';
		if(!!$scope.user.player){
			url='http://zarad.herokuapp.com/api/user/signin';
		}
		else if(!!$scope.user.club){
			url='http://zarad.herokuapp.com/api/club/signin';
		}


		if(url){
		  	Auth.signin($scope.user,url)
		  	.then(function(resp){
		  		$scope.user.password = '';
		  		$scope.user.username = '';
		  		//save the token and username in local stoarage to distinguish signed in users
				$window.localStorage.setItem('com.zarad', resp.token);
				$window.localStorage.setItem('com.user', resp.user);
				$location.path('/userprofile/'+resp.user);
		  	}).catch(function(error){
		  		if(error.data = 'User Does Not Exist'){
		  			$scope.showAlert('Username or password is incorrect');
		  		} 

		  		console.error(error.data);
		  	});
		}
  };
})