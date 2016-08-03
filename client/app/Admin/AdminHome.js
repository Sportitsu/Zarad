angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin){

	$scope.club = {};
  $scope.tournament = {};

  $scope.Addclub =function(){
    console.log($scope.club);
  	Admin.Addclub($scope.club)
  	.then()
  }

  $scope.Addtournament =function(){
    console.log($scope.tournament);
    Admin.Addtournament($scope.tournament)
    .then()
    
  }
})