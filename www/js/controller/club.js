'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club,User){
	$scope.clubUser={};
	$scope.clubUsers={};
	$scope.club={};

	$scope.getcolor=function(place){
		console.log('enterd')
		if(place=== 1){
			return 'red';
		}else if(place===2){
			return 'blue';
		}else if(place===3){
			return 'black'
		}
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
			console.log(resp.data);
			$scope.clubUsers.data=resp.data;
		})
	}
	$scope.getUsers();
	$scope.getClub();
});