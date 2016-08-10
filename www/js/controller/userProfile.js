angular.module('zarad.user',['ionic'])
.controller('UserProfileController',
 function($scope, $ionicPopup, $state, Auth, $location, $window, $ionicPlatform, User, $ionicLoading, $timeout){
 $scope.user = {};
 $scope.data = {};
 $scope.flag = false;

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Are you sure of your edit',
     template: 'Please be sure'
   });

   confirmPopup.then(function(res) {
     if(res) {
     	$scope.isChecked = false;
     	$scope.flag = false;
     	$scope.confirm();
     } else {
       console.log('You are not sure');
     }
   });
 };

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $timeout(function () {
    $ionicLoading.hide();
	 console.log($window.localStorage.getItem('com.zarad'));
	 User.getUser($window.localStorage.getItem('com.user'))
	 	.then(function(data){
	 		$scope.data = data.data;
	 		console.log(data.data);
	 	})
	 	.catch(function(error){
	 		console.log(error);
	 	});
  }, 1000);


 $scope.edit = function(){
  if($scope.isChecked){
  	$scope.flag = true;
  } else {
  	$scope.flag = false;
  }
 }

 $scope.confirm = function(){
 	$scope.user.username = $scope.data.username;
 	User.editProfile($scope.user)
 		.then(function(response){
 			$scope.data = response.data;
 		})
 		.catch(function(error){
 			console.log(error);
 		})
	$state.go($state.current, {}, {reload: true});
 }

})
