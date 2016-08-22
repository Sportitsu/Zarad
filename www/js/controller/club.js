'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club,User,$ionicPopup,$timeout,$location, $ionicActionSheet, $ionicModal){
	//added somethign for pull request
	$scope.clubNewUser={};
	$scope.clubUsers={};
	$scope.club={};
	$scope.userProfileData={};
	$scope.editUserProfileData={};
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

	$scope.getUserPlace=function(place,username){
		$scope.editUserProfileData.place=place;
		$scope.editUserProfileData.username=username;
	}
	$scope.showUser=function(data){
		$scope.userProfileData=data;
		$scope.userProfileModal.show();
	}
	$scope.editUserProfile=function(data){
		$scope.userProfileData=data;
		$scope.editUserModal.show();
	}
	$scope.cancelClubEditing=function(){
		$scope.editClubModal.hide();
	}

	$scope.cancelAdding=function(){
		$scope.addUserModal.hide();
	}

	$scope.cancelView=function(){
		$scope.userProfileModal.hide();
	}
	$scope.cancelUserEditing=function(){
		$scope.editUserModal.hide();
	}

	$scope.removeUser=function(user){
		var confirmPopup = $ionicPopup.confirm({
	     title: 'Are you sure you want to remove '+user.user.firstName+' '+user.user.lastName+'?',
	     template: ''
	    });
	    confirmPopup.then(function(res) {
		    if(res) {
		    	var username=user.user.username;
		     	User.deleteUser({username : username}).then(function(resp){
				var alertPopup = $ionicPopup.alert({
	            	title: 'User '+ user.user.firstName +'  '+ user.user.lastName +' has been removed'
	    		})
	    		.then(function(){
					$scope.editUserModal.hide();
					$scope.getUsers();
	    		})
			});
		    }else{
		       $scope.editUserModal.hide();
		    }
	    });
	}

	$scope.removeUserEnded=function(user){
		var confirmPopup = $ionicPopup.confirm({
	     title: 'Are you sure you want to remove '+user.firstName+' '+ user.lastName+'?',
	     template: ''
	    });
	    confirmPopup.then(function(res) {
		    if(res) {
		    	var username=user.username;
		     	User.deleteUser({username : username}).then(function(resp){
				var alertPopup = $ionicPopup.alert({
	            	title: 'User '+ user.firstName +'  '+ user.lastName +' has been removed'
	    		})
	    		.then(function(){
					$scope.getUsers();
	    		})
			});
		   }
	    });
	}

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

	$scope.confirmUserEdit=function(){
		var data=$scope.editUserProfileData;
		if(!data.place){
			var alertPopup = $ionicPopup.alert({
	             title: 'please choose a middle to save your edit'
	    })
		}else if(data.username){
			User.editProfile(data).then(function(resp){
				var alertPopup = $ionicPopup.alert({
	             title: 'Your Edit has been Added'
	             }).then(function(){
					$scope.editUserModal.hide();
					$scope.editUserProfileData={};
					$scope.getUsers();
	             })
			})
		}else{
			var alertPopup = $ionicPopup.alert({
	             title: 'No Changes has been recorded'
	        })
			.then(function(){
				$scope.editUserModal.hide();
				$scope.editUserProfileData={};

			})
		}
	}

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
             })
			.then(function(){
				$scope.addUserModal.hide();
             })
		});
		$scope.clubNewUser={};
	};

	$scope.show=function(){
		if($scope.usersToSubscribe.length !== undefined)
			return true
		else 
			return false
	}
	$scope.getAchievmentData=function(data){
		if(typeof data === 'string'){
			$scope.clubNewUser.beltColor=data;	
		}else if(typeof data === 'number'){
			if($scope.clubNewUser.achievements !== undefined){
				$scope.clubNewUser.achievements.place=data;
			}else{
				$scope.clubNewUser.achievements={};
				$scope.clubNewUser.achievements.name="";
				$scope.clubNewUser.achievements.place=data;
			}
		}
	}

	$scope.getClub=function(){
		var username=$window.localStorage.getItem('user');
		Club.getClub(username).then(function(resp){
			$scope.club.data=resp;
			 $scope.getUsers();
		})
	};
	$scope.getClub();
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
				firstName: user.firstName,
				lastName: user.lastName,
				subscription: willFinish,
				username: user.username,
				valid: user.valid,
				image: user.image,
				daysLeft: willFinish
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
					lastName: user.lastname,
					username: user.username,
					subscription: willFinish,
					image:user.image,
					valid:user.valid
				})
			}
	}


	$scope.resup=function(user){
	var myPopup = $ionicPopup.show({
   	template: '<onezone-datepicker datepicker-object="onezoneDatepicker"><button class="button button-block button-outline icon icon-left ion-calendar button-dark bt show-onezone-datepicker">{{onezoneDatepicker.date | date:"dd MMMM yyyy"}} Picker</button></onezone-datepicker>',
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
      myPopup.close();
   }, 60000);
}

	$scope.renew = function(user){
		var months=$scope.getTime();
		if(months=== 0){
			var alertPopup = $ionicPopup.alert({
	           	title: 'Please select date with at least one month range'
	    	});
	    	$scope.onezoneDatepicker.date='';
		}else{
			var confirmPopup = $ionicPopup.confirm({
		     title: 'Are you sure you want to resubscribe for '+user.firstName+' '+user.lastName+'?',
		     template: ''
		    });
		    confirmPopup.then(function(res) {
			    if(res) {
			    	User.resub({username : user.username, membership : months})
			        .then(function(response){
				        var alertPopup = $ionicPopup.alert({
				        title: 'user'+' '+user.firstName +' '+ user.lastName + ' ' +'have beed resubscribed'
				    	})
				    	.then(function(){
				           $scope.getUsers();
				           $scope.onezoneDatepicker.date="";
				    	})
			    	})
			    }else{
			    	$scope.onezoneDatepicker.date="";
			    }
	    	});
		}
	};

	$scope.getTime=function(){
		var date=$scope.onezoneDatepicker.date;
		var newDate=new Date(date);
		var membershipYear=newDate.getFullYear();
		var membershipMonth=newDate.getMonth();
		var now=Date.now();
		var nowDateYear=new Date(now).getFullYear();
		var nowDateMonth=new Date(now).getMonth();

		if(membershipYear === nowDateYear && membershipMonth <= nowDateMonth){
			return 0;
		}else if(nowDateMonth > membershipMonth){
			var results=12-nowDateMonth;
			results+=membershipMonth;
			return results;
		}else{
			var results=membershipMonth-nowDateMonth;
			return results;
		}
	};
})