angular.module('zarad.index',['ionic'])
.controller('parentController',function($scope, $ionicModal, $ionicPopup, $state, $timeout, $ionicActionSheet, $window, Auth, User){
	//this controller was made for index html page to show and hide logout button
	//depending on user saved token in the localstoarge.
	//signout function
	$scope.user = {};
	$scope.data = JSON.parse(window.localStorage.user)
	
	if($scope.data.beltColor.toLowerCase() !== 'white'){
		$scope.initColor = 'white';
	} else {
		$scope.initColor = 'black';
	}
	$scope.showAction = function() {
	// Show the action sheet
	var hideSheet = $ionicActionSheet.show({
	 buttons: [
	   { text: '<span>Edit</span>' },
	   { text: '<span>Logout</span>'}
	 ],
	 titleText: '<code>Action Menu</code>',
	 cancelText: '<b>Cancel</b>',
	 cancel: function() {
	      console.log('Canceled');
	    },
	 buttonClicked: function(index) {
	   if(index === 0 ){
		    $scope.modal.show();
		    hideSheet();
	   } else {
			$scope.logout();
			hideSheet();
	   }
	 }
	});
	};
	
	$scope.logout=function(){
		Auth.signout();
	};



	$ionicModal.fromTemplateUrl('js/templates/User/profile-edit.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
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

	 $scope.confirm = function(){
	  $scope.user.username = $scope.data.username;
	  console.log($scope.user);
	 	User.editProfile($scope.user)
	 		.then(function(response){
	 			$scope.data = response.data;
	 			console.log(response);
	 		})
	 		.catch(function(error){
	 			console.log(error);
	 		})
		$state.go($state.current, {}, {reload: true});
	   $timeout(function() {
	      $scope.modal.hide();
	    }, 500);
	 }
})