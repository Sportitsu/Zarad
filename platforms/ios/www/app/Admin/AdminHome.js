angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin){

	$scope.club = {};
  $scope.tournament = {};
<<<<<<< HEAD
  $scope.user={};


=======
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17

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
<<<<<<< HEAD
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
=======
>>>>>>> 3e0815cb5dff795cb2508fd447f0d9471d409d17
})