'use strict';
angular.module('zarad.tournament',[])
.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
}) 
.controller('TournamentController',function($scope, $window, $location,Tournament,$ionicSlideBoxDelegate){
	$scope.AllTournament={}
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			console.log(AllTournament);
			$scope.AllTournament.data=AllTournament;
			console.log($scope.AllTournament)
		})
	}
	$scope.getAllTournament();

  $scope.repeatDone = function() {
  	console.log($ionicSlideBoxDelegate)
  //$ionicSlideBoxDelegate.$getByHandle('myhandle').slide(0);
  $ionicSlideBoxDelegate.update();
  //$ionicSlideBoxDelegate.slide($scope.week.length - 1, 1);
};
})