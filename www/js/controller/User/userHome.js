angular.module('zarad.home', ['ionic'])
.controller('UserHomeController' , function($scope){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true
	$scope.todos = [
	  { task  : 'Eat Healthy Food'}
	  ,
	  {task : 'Drill Half Guard 1000 Times'}
	  ,
	  {task : 'Run 1000 M in 2 minutes'}
	]
});
