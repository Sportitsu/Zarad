'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament,$ionicModal){
	$scope.AllTournament={};
	$scope.SearchTournament={};
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


  $ionicModal.fromTemplateUrl('js/templates/tournamentList.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(tournament) {
      console.log(tournament);
      $scope.tournament = tournament;
   });

   $scope.showtournament=function(){
   	$scope.getSearchTournament();
   	$scope.tournament.show();
   }
   $scope.closetournament=function(){
   	$scope.tournament.hide();
   }
  
  $scope.getSearchTournament=function(){
  	console.log($scope.search);
  	Tournament.getSearchTournament($scope.search)
  	.then(function(tournament){
  		console.log(tournament)
  		$scope.SearchTournament.data=tournament;
  		console.log($scope.SearchTournament.data)
  	})

  }
 
 
})