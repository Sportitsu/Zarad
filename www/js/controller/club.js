'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club,User,$ionicPopup,$timeout,$location, $ionicActionSheet, $ionicModal, $cordovaCamera){
	//added somethign for pull request
	$scope.clubNewUser={};
	$scope.clubUsers={};
	// Added to the club.html
	$scope.club={};
	$scope.userProfileData={};
	$scope.editUserProfileData={};
	$scope.usersToSubscribe={};
	$scope.usersEndedSubs={};
	$scope.onezoneDatepicker = { date: 'date' };

	$scope.cancelAction = function(){
		console.log('nothing here');
	};

	$scope.showClubAction = function() {
		var hideSheet = $ionicActionSheet.show({
		 buttons: [
		   { text: '<span>Add User</span>' },
		   { text: '<span>Edit Profile</span>'},
		   { text: '<span>Logout</span>'}
		 ],
		 cancelText: '<b>Cancel</b>',
		 cancel: $scope.cancelAction , 
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
	};

	 $scope.showOptions = function(){
       $ionicPopup.show({
        titleText : 'Please Select',
        scope : $scope,
        buttons : [
           { text: '<h6>Camera</h6>' ,
             type: 'button button-outline' ,
             onTap : function(){
              $scope.takePhoto({type : Camera.PictureSourceType.CAMERA });
              console.log('Clicked On Camera');
             } },
        { text: '<h6>Photos</h6>',
          type: 'button button-outline',
          onTap : function(){
            $scope.takePhoto({type : Camera.PictureSourceType.PHOTOLIBRARY });
          }},
          {text: 'exit'}
        ]
      });
    };

     $scope.takePhoto = function(source){
      var options = {
        quality : 50,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : source.type ,
        allowEdit: true ,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options) 
                    .then(function(imageData){
                      uploadToIMGUR('',imageData, function(response){
                        var object = {
                          username  : $scope.data.username ,
                          image : response.link
                        };
                       $scope.club.data.Image = response.link;
                        User.editProfile(object)
                            .then(function(response){
                              alert('WhatsApp Guyss');
                              $scope.data.image = response.image;
                            })
                            .catch(function(error){
                              alert(error);
                            });
                      });
      });
   };
   
	$scope.getUserPlace=function(place){
		$scope.editUserProfileData.place=place;
	};
	$scope.showUser=function(data){
		$scope.userProfileData=data;
	};
	$scope.editUserProfile=function(data){
		$scope.userProfileData=data;
	};

	$scope.removeUser=function(user){
		var confirmPopup = $ionicPopup.confirm({
	     title: 'Are you sure you want to remove '+user.user.firstName+' '+user.user.lastName+'?',
	     template: ''
	    });
	    confirmPopup.then(function(res) {
		    if(res) {
		    	var username=user.user.username;
		     	User.deleteUser({username : username}).then(function(){
				$ionicPopup.alert({
	            	title: 'User '+ user.user.firstName +'  '+ user.user.lastName +' has been removed'
	    		})
	    		.then(function(){
					$scope.editUserModal.hide();
					$scope.getUsers();
	    		});
			});
		    }else{
		       $scope.editUserModal.hide();
		    }
	    });
	};

	$scope.removeUserEnded=function(user){
		var confirmPopup = $ionicPopup.confirm({
	     title: 'Are you sure you want to remove '+user.firstName+' '+ user.lastName+'?',
	     template: ''
	    });
	    confirmPopup.then(function(res) {
		    if(res) {
		    	var username=user.username;
		     	User.deleteUser({username : username}).then(function(){
				$ionicPopup.alert({
	            	title: 'User '+ user.firstName +'  '+ user.lastName +' has been removed'
	    		})
	    		.then(function(){
					$scope.getUsers();
	    		});
			});
		   }
	    });
	};

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

	$scope.confirmUserEdit=function(user){
		$scope.editUserProfileData.username=user;
		var data=$scope.editUserProfileData;
		if(!data.place && data.achievements || data.place && !data.achievements){
		     $ionicPopup.alert({
	             title: 'please fill achievement data to save your edit'
	    });
		}else if(data.username){
			User.editProfile(data).then(function(){
				 $ionicPopup.alert({
	             title: 'Your Edit has been Added'
	             }).then(function(){
					$scope.editUserModal.hide();
					$scope.editUserProfileData={};
					$scope.getUsers();
	             });
			});
		}else{
		     $ionicPopup.alert({
	             title: 'No Changes has been recorded'
	        })
			.then(function(){
				$scope.editUserModal.hide();
				$scope.editUserProfileData={};

			});
		}
	};

	$scope.editClub=function(){
		Club.editClub($scope.club.data).then(function(resp){
			if(resp.status !== 500){
				$scope.editClubModal.hide();
				$scope.getClub();
			}else{
				 $ionicPopup.alert({
	            title: resp.data
	            })
	            .then(function(){
	            	$scope.getClub();
	            });
			}
		});
	};

	$scope.AddUser=function(){
			$scope.clubNewUser.membership=membership;
			$scope.clubNewUser.club=$scope.club.data.clubName;
			Club.AddUser($scope.clubNewUser).then(function(resp){
				 $ionicPopup.alert({
	             title: 'Your User Name is:'+resp.username
	             })
				.then(function(){
					$scope.addUserModal.hide();
	             });
			});
			$scope.clubNewUser={};
	};

	$scope.show=function(){
		if($scope.usersToSubscribe !== {} || $scope.usersEndedSubs !== {}){
			return true;
		}else{ 
			return false;
		}
	};
	$scope.getAchievmentData=function(data){
		if(typeof data === 'string'){
			$scope.clubNewUser.beltColor=data;	
		}else if(typeof data === 'number'){
			if($scope.clubNewUser.achievements !== undefined){
				$scope.clubNewUser.achievements.place=data;
			}else{
				$scope.clubNewUser.achievements={};
				$scope.clubNewUser.achievements.name='';
				$scope.clubNewUser.achievements.place=data;
			}
		}
	};

	$scope.getClub=function(){
		var username=$window.localStorage.getItem('user');
		Club.getClub(username).then(function(resp){
			$scope.club.data=resp;
			 $scope.getUsers();

		});
	};

	// Calling in the ng- init club.html
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
		});
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
				});
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
				});
			}
	};


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
         onTap: function() {
    	 $scope.renew(user);
         }
       },
     ]
   });
   myPopup.then(function() {
   });
   $timeout(function() {
      myPopup.close();
   }, 60000);
};

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
			        .then(function(){
				        $ionicPopup.alert({
				        title: 'user'+' '+user.firstName +' '+ user.lastName + ' ' +'have beed resubscribed'
				    	})
				    	.then(function(){
				           $scope.getUsers();
				           $scope.onezoneDatepicker.date="";
				    	});
			    	});
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
});