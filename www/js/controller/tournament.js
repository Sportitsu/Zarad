'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, Tournament){
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
	if($window.localStorage.member!==undefined){
       $scope.LikeCtrl=true
      $scope.link="#/userprofile/home"
	}else{
		$scope.link="#/"
	}
	
	}
	$scope.ceckuserandadmin=function(){
		
	if($window.localStorage.user!==undefined ){
       $scope.Backbutton=true;
	}
	}
	$scope.ceckuserandadmin();
	$scope.ceckuser();
	
	$scope.Like=function(tournament){
        var member=JSON.parse($window.localStorage.member)
        Tournament.Like({name:tournament.name,
                         username:member.username,
                        })
        .then(function(resp){
            $scope.getAllTournament();
            
        })
    }
    
})