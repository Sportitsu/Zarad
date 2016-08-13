'use strict';
angular.module('zarad.auth',[])
.controller('AuthController',function($scope ,$location, User, $window , Auth, $ionicPopup, $timeout){
	$scope.user={};
	$scope.showPopup = function() {
   //custom popup to show login box
   var myPopup = $ionicPopup.show({
   	template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Enter First Name" ng-model="user.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter your password" ng-model="user.password"></label>',
   	title: '<p>Enter your login information</p>',
     subTitle: 'Please fill all the fields',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Login</b>',
         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
         onTap: function(e) {
           if (!$scope.user.username || !$scope.user.password) {
             //don't allow the user to close unless they fill the fields
             e.preventDefault();
           } else {
             // return $scope.user;
             $scope.signin();
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!');
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 1 minute
   }, 60000);
  };

	$scope.signin =function(){
  	Auth.signin($scope.user)
  	.then(function(resp){
     //save the token and username in local stoarage to distinguish signed in users
     User.getUser(resp.user)
     .then(function(response){
  		$window.localStorage.setItem('com.zarad', resp.token);
  		window.localStorage['user'] = angular.toJson(response.data);
  		$location.path('/userprofile');
     })
     .catch(function(error){
      console.log(error);
     })
  	}).catch(function(error){
  		console.error(error);
  	});
  };
})






// <<<<<<< HEAD
// .controller('AuthController',function($scope ,$location, $window , Auth, $ionicPopup){
// 	console.log(1);
//      $scope.user={};
// 	 $scope.showAlert = function(type, tx) {
// 	   var alertPopup = $ionicPopup.alert({
// 	     title: type,
// 	     text : tx

// 	 });
// 	   alertPopup.then(function(res) {
// 	     console.log('Thank you for helping us fix that ' + type);
// 	   });
// 	 };

// 	$scope.signin =function(){
// 		if(!$scope.user.player && !$scope.user.club){
// 			return $scope.showAlert('Missing Radio Button');
// 		}
// 		if(!$scope.user.username){
// 			return $scope.showAlert('Missing Username Field');
// 		} else if(!$scope.user.password){
// 			return $scope.showAlert('Missing Password Field')
// 		}

// 		var url='';
// 		if(!!$scope.user.player){
// 			url='https://zarad.herokuapp.com/api/user/signin';
// 		}
// 		else if(!!$scope.user.club){
// 			url='https://zarad.herokuapp.com/api/club/signin';
// 		}
		
// 		if(url){
// 		  	Auth.signin($scope.user,url)
// 		  	.then(function(resp){
// 		  		$scope.user.password = '';
// 		  		$scope.user.username = '';
// 		  		//save the token and username in local stoarage to distinguish signed in users
// 				$window.localStorage.setItem('com.zarad', resp.token);
// 				$window.localStorage.setItem('com.user', resp.user);
// 				$location.path('/userprofile/'+resp.user);
// 		  	}).catch(function(error){
// 		  		if(error.data = 'User Does Not Exist'){
// 		  			$scope.showAlert('Username or password is incorrect');
// 		  		} 

// 		  		console.error(error.data);
// 		  	});
// 		}
// =======