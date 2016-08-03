angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin){

	$scope.club = {};
  $scope.tournament = {};
  //add club function
  $scope.Addclub =function(){
    console.log($scope.club);
  	Admin.Addclub($scope.club)
  	//.then()
  }
  //add tournament function
  $scope.Addtournament =function(){
    console.log($scope.tournament);
    Admin.Addtournament($scope.tournament)
    //.then()
    
  }
})