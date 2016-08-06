angular.module('zarad.club',['ionic'])
.controller('clubController',function($scope,club){
	$scope.clubUser={};
	$scope.AddUser=function(){
		var data=$scope.clubUser;
		club.AddUser(data).then(function(resp){
			console.log(resp.data)
		})
	}
	$scope.editClub=function(){
		
	}
})