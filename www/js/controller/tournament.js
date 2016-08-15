'use strict';
angular.module('zarad.tournament',[])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	$scope.AllTournament={}
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament.data=AllTournament;
		})
	}
	$scope.getAllTournament();
})