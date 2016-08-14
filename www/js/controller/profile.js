'use strict';
angular.module('zarad.profile',[])
.controller('profileController',function($scope,Profile, $routeParams){
	//$scope,$window,profile
	//var user= $window.localStorage.getItem("com.Zarad")	
	//console.log(user)
	$scope.club={};
	$scope.getClub=function(){
		Profile.getClub($routeParams.username).then(function(profile,err){
			if(err){
				console.log(err,"wwwwww");
			}
			console.log('clubdata',profile);
			$scope.club.profile=profile;
		})
		}
		$scope.getClub();
});
