'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club,User,$ionicPopup,$timeout,$location, $ionicActionSheet, $ionicModal){
	$scope.clubNewUser={};
	$scope.clubUsers={};
	// Added to the club.html
	// $scope.club={};
	$scope.userProfileData={};
	$scope.username="";
	$scope.usersToSubscribe={};
	$scope.usersEndedSubs={};
	$scope.onezoneDatepicker = { date: 'date' };

	$scope.showClubAction = function() {
		var hideSheet = $ionicActionSheet.show({
		 buttons: [
		   { text: '<span>Add User</span>' },
		   { text: '<span>Edit Profile</span>'},
		   { text: '<span>Logout</span>'}
		 ],
		 cancelText: '<b>Cancel</b>',
		 cancel: function() {
		    },
		 buttonClicked: function(index) {
		   if(index === 0 ){
			    //$location.path('/addUser')
			    $scope.addUserModal.show();
			    hideSheet();
		   } else if(index === 2){
				Club.signout();
				hideSheet();
		   } else {
		   		$scope.editClubModal.show();
		   	    hideSheet();
		   	}
		  }
		});
	};

	$scope.callModals = function(){
		$ionicModal.fromTemplateUrl('js/templates/club/editClubProfile.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.editClubModal = modal;
		});

		$ionicModal.fromTemplateUrl('js/templates/club/addUser.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.addUserModal = modal;
		});

		$ionicModal.fromTemplateUrl('js/templates/club/userProfile.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.userProfileModal = modal;
		});

		$ionicModal.fromTemplateUrl('js/templates/club/editUserProfile.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.editUserModal = modal;
		});
	}

	$scope.showUser=function(data){
		$scope.userProfileData=data;
	}
	$scope.editUser=function(data){
		$scope.userProfileData=data;
	}

	// $scope.cancelClubEditing=function(){
	// 	$scope.editClubModal.hide();
	// }

	// $scope.cancelAdding=function(){
	// 	$scope.addUserModal.hide();
	// }

	// Has no button that calls this
	// $scope.cancelView=function(){
	// 	$scope.userProfileModal.hide();
	// }


	// $scope.cancelUserEditing=function(){
	// 	$scope.editUserModal.hide();
	// }


	$scope.confirmClubEdit=function(){
	var confirmPopup = $ionicPopup.confirm({
     title: 'Are you sure of your edit',
     template: ''
    });
    confirmPopup.then(function(res) {
     if(res) {
     	$scope.editClub();
     } else {
       $scope.editClubModal.hide();
     	}
     });
	};

	$scope.editClub=function(){
		Club.editClub($scope.club.data).then(function(resp){
			$scope.editClubModal.hide();
		})
	}

	$scope.AddUser=function(){
		$scope.clubNewUser.club=$scope.club.data.clubName;
		Club.AddUser($scope.clubNewUser).then(function(resp){
			var alertPopup = $ionicPopup.alert({
             title: 'Your User Name is:'+resp.username
             });
			$scope.addUserModal.hide();
		});
		$scope.clubNewUser={};
	};

	$scope.show=function(){
		if($scope.usersToSubscribe.length !== undefined)
			return true
		else 
			return false
	}

	$scope.getClub=function(){
		var username=$window.localStorage.getItem('user');
		Club.getClub(username).then(function(resp){
			$scope.club.data=resp;
			console.log(resp)
			 $scope.getUsers();
		})
	};

	// Calling in the ng- init club.html
	// $scope.getClub();


	$scope.getUsers=function(){
		var clubname=$scope.club.data['clubName'];
		Club.getClubUsers(clubname)
		.then(function(resp){
			//all users data
			$scope.clubUsers.data=[];
			//users that about to finish their subscription
			$scope.usersToSubscribe.data=[];
			//users finished their subscription
			$scope.usersEndedSubs.data=[];
			for (var i = 0; i < resp.data.length; i++) {
				var date=new Date(resp.data[i].subscription).toString();
				resp.data[i].subscription=date.substr(0,16);
				$scope.clubUsers.data.push({user:resp.data[i]});
				//check if the user subscription ended or have 3 days left
				$scope.checkSubscription(resp.data[i]);
			}
		})
	};

	$scope.checkSubscription=function(user){
		if(user.resub){
			//calculate time user subs finishes
			var willFinish = new Date(user.subscription+((30*24*60*60*1000)*user.membership));
		    willFinish+='';
		    willFinish = willFinish.substr(0,16);
		    //save all almost ended users subs to object
			$scope.usersToSubscribe.data.push({
				firstName:user.firstName,
				lastname:user.lastName,
				subscription:willFinish,
				username:user.username,
				valid:user.valid,
				image:user.image,
				daysLeft:willFinish
				})
			}
			//check if user subscibtion finished.
			if(!user.valid){
				var willFinish = new Date(user.subscription+((30*24*60*60*1000)*user.membership));
		        willFinish+='';
		        willFinish = willFinish.substr(0,16);
				//save all ended users subs to object
				$scope.usersEndedSubs.data.push({
					firstName: user.firstName,
					lastname: user.lastname,
					username:user.username,
					subscription: willFinish,
					valid:user.valid,
					image:user.image
				})
			}
	}


	$scope.resup=function(user){
	var myPopup = $ionicPopup.show({
   	template: '<onezone-datepicker datepicker-object="onezoneDatepicker"><button class="button button-block button-outline icon icon-left ion-calendar button-dark bt show-onezone-datepicker">{{onezoneDatepicker.date | date:"dd MMMM yyyy"}} click to pick the date</button></onezone-datepicker>',
   	title: '<p>Enter your login information</p>',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Regester</b>',
         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
         onTap: function(e) {
    	 $scope.renew(user);
         }
       },
     ]
   });
   myPopup.then(function(res) {
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 1 minute
   }, 60000);
}

	$scope.renew = function(user){
		var months=$scope.getTime() || 1;
	    User.resub({username : user, membership : months})
	        .then(function(response){
	          $scope.getUsers();
	     })
	};

	$scope.getTime=function(){
		var date=$scope.onezoneDatepicker.date;
		var newDate=new Date(date);
		var membership=newDate.getMonth();
		var now=Date.now();
		var nowDate=new Date(now).getMonth();
		if(nowDate > membership){
			var results=12-nowDate;
			results+=membership;
			return results;
		}else if(nowDate === membership){
			return ;
		}else{
			var results=membership-nowDate;
			return results;
		}
	}

	//call functions to get data
	//$scope.getUsers();
})