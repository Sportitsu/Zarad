'use strict';
angular.module('zarad.profile',['ionic'])
.controller('profileController',function($scope,Profile){
	//$scope,$window,profile
	console.log('clubdata');
	$scope.club={};
	$scope.getClub=function(){
		Profile.getClub().then(function(profile,err){
			if(err){
				console.log(err)
			};

			console.log('clubdata',profile);
			$scope.club.profile=profile;
		})
		}
		$scope.getClub();

 
});