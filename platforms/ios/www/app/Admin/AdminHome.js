angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin){

	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};



  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
  	//.then()
  }
  //add tournament function
  $scope.Addtournament =function(){
    //Admin.Addtournament($scope.tournament)
    //.then()

  }
  $scope.Adminsignin =function(){
    console.log($scope.user)
    Admin.Adminsignin($scope.user)
    .then(function(data){
    $location.path('/admin');
    }).catch(function(error){
      console.error(error);
    })
  }
       
$scope.Addadmin =function(){
    //console.log($scope.user)
    Admin.Addadmin($scope.user)
}
})