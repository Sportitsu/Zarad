'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club,User,$ionicPopup,$timeout){
	$scope.clubUser={};
	$scope.clubUsers={};
	$scope.club={};
	$scope.usersToSubscribe={};
	$scope.usersEndedSubs={}

	$scope.view=function(){
		console.log('ejhhhh')
	}

	$scope.AddUser=function(){
		var data=$scope.clubUser;
		Club.AddUser(data).then(function(resp){
			console.log(resp.data);
		});
	};
	$scope.editClub=function(){
		
	};
	$scope.getClub=function(){
		var username=$window.localStorage.getItem('user');
		Club.getClub(username).then(function(resp){
			console.log(resp.data.clubName);
			$scope.club.data=resp.data;
		})
	};
	$scope.getUsers=function(){
		User.getAllUsers().then(function(resp){
			//all users data
			$scope.clubUsers.data=[];
			//users that about to finish their subscription
			$scope.usersToSubscribe.data=[];
			//users finished their subscription
			$scope.usersEndedSubs.data=[];
			for (var i = 0; i < resp.data.length; i++) {
				$scope.clubUsers.data.push({user:resp.data[i]});
				//check if the user subscription have 3 days left
				if(resp.data[i].resub){
					//calculate time user subs finishes
					var willFinish = new Date(resp.data[i].subscription+((30*24*60*60*1000)*resp.data[i].membership));
	           	 	willFinish+='';
	            	willFinish = willFinish.substr(0,16);
	            	//push all the users to object to view them
					$scope.usersToSubscribe.data.push({
						firstName:resp.data[i].firstName,
						lastname:resp.data[i].lastName,
						subscription:willFinish,
						valid:resp.data[i].valid,
						image:resp.data[i].image,
						daysLeft:'less than 3 days'
					})
				}
				//check if user subscibtion finished.
				if(!resp.data[i].valid){
					var willFinish = new Date(resp.data[i].subscription+((30*24*60*60*1000)*resp.data[i].membership));
	           	 	willFinish+='';
	            	willFinish = willFinish.substr(0,16);
					$scope.usersEndedSubs.data.push({
						firstName: resp.data[i].firstName,
						lastname: resp.data[i].lastname,
						subscription: willFinish,
						valid:resp.data[i].valid,
						image:resp.data[i].image
					})
				}
			}
			console.log($scope.usersToSubscribe.data)
			console.log($scope.usersEndedSubs.data)
			console.log($scope.clubUsers.data)
		 })
	}
	$scope.renew = function(user,membership){
	    var months = membership || 1
	    User.resub({username : user, membership : months})
	        .then(function(response){
	          console.log(response);
	          console.log('done');
	        })
	        .catch(function(error){
	          console.log(error);
	        });
	};

	$scope.resup=function(){
	var myPopup = $ionicPopup.show({
   	template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" id="n" placeholder="Enter First Name" ng-model="user.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter your password" ng-model="user.password"></label>',
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
             e.preventDefault();
           } else {
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
}
	$scope.getUsers();
	$scope.getClub();
	$scope.renew('mihyar','2');

});