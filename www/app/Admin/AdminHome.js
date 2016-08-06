angular.module('zarad.admin',['ionic'])

.controller('AdminController',function($scope, $window, $location,Admin){

	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};

  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
   .then(function (res) {
    //console.log(res);
      })
  }
  //add tournament function
  $scope.Addtournament =function(){
    Admin.Addtournament($scope.tournament)
    .then(function (res) {
       console.log(res);
      })

  }
  $scope.Adminsignin=function(){}
})