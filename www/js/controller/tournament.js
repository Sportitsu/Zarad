'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament,$ionicModal){
	$scope.AllTournament={};
	$scope.SearchTournament={};
	$scope.LikeCtrl=""
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament.data=AllTournament;
		})
	}
	$scope.getAllTournament();
	
	$scope.ceckuser=function(){
		console.log($window.localStorage.member)
	if($window.localStorage.member!==undefined){
       $scope.LikeCtrl=true
	}
	}
	$scope.ceckuser();

	$scope.Like=function(tournament){
		console.log(tournament._id)
		var member=JSON.parse($window.localStorage.member)
		console.log(member.username)

		Tournament.Like({tourid:tournament._id,
						 username:member.username,
						 like:true,
						 disLike:false
						})
		.then(function(resp){
			//console.log(resp);
		})
	}

	$scope.DisLike=function(tournament){
		console.log(tournament)
		var member=JSON.parse($window.localStorage.member)
        console.log(member.username)
		Tournament.DisLike({tourid:tournament._id,
						 username:member.username,
						 like:false,
						 disLike:true
						})
		.then(function(resp){
			//console.log(resp);

		})
	}

})