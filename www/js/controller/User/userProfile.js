angular.module('zarad.user',['ionic'])
.controller('UserProfileController',
 function($scope, $ionicPopup, $state, Auth, $location, $window, $ionicPlatform, User, $ionicLoading, $timeout){
 $scope.user = {};
 $scope.data = {};
 $scope.flag = false;

  $scope.showPopup = function() {
   //custom popup to show login box
   var myPopup = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Edit First Name" ng-model="user.firstName" ng-value="data.firstName" ></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Edit Last Name" ng-model="user.lastName" ng-value="data.lastName"></label><br>' + 
              '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Change Email" ng-model="user.email" ng-value="data.email" ></label><br>' +
              '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Change Phone Number" ng-model="user.phone" ng-value="data.phone" ></label><br>' +
              '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Edit Age" ng-model="user.age" ng-value="data.age" ></label><br>' + 
              '<button ng-click="showPassWord()">Change Password</button>',
    title: '<p>Edit Personal Profile</p>',
     scope: $scope,
     buttons: [
       { text: 'Exit',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Update Profile</b>',
         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
         onTap: function(e) {
          $scope.confirm();
         }
       },
     ]
   })
 };

 $scope.showPassWord = function(){
  var myPopup = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter Old Password" ng-model="user.oldPassword"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter New Password" ng-model="user.password"></label><br>' ,
              
    title: '<p>Edit Personal Profile</p>',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Change</b>',
         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
         onTap: function(e) {
          $scope.showConfirm();
         }
       },
     ]
   })
 }

  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Please Renew Your Subscription',
       text : 'Contact your gym as soon as possible'

   });
     alertPopup.then(function(res) {
       // console.log('Thank you for helping us fix that ' + type);
     });
   };


  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'You will change your Password',
     template: 'Are you sure?'
   });

   confirmPopup.then(function(res) {
     if(res) {
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
	 User.getUser($window.localStorage.getItem('com.user'))
	 	.then(function(data){
      console.log(data);
	 		$scope.data = data.data;
	 	})
	 	.catch(function(error){
	 		console.log(error);
	 	});
  }, 1000);

  // if(!$scope.data.valid){
  //       $scope.showAlert();
  // }

 $scope.edit = function(){
  console.log($scope.isChecked.value);
  if($scope.isChecked){
  	$scope.flag = true;
  } else {
  	$scope.flag = false;
  }
 }

 $scope.confirm = function(){
  $scope.user.username = $scope.data.username;
  console.log($scope.user);
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
