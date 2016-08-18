'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	$scope.AllTournament={}
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament.data=AllTournament;
		})
	}
	$scope.getAllTournament();


  /*$ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope
  }).then(function(modal) {
  	console.log("dsf")
    $scope.modal = modal;
  });*/
 
})