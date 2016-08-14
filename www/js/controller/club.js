'use strict';
angular.module('zarad.club',[])
.controller('clubController',function($scope,$window,Club){
	$scope.clubUser={};
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
			console.log(resp);
		})
	}
	$scope.getClub();
});