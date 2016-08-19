angular.module('zarad.home', ['ionic'])
.controller('UserHomeController' , function($scope, $state, User, $window){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
	$scope.data = JSON.parse($window.localStorage.member);
	$scope.todos = $scope.data.goals;


	$scope.updateTodo = function(goalDone){
		// Todo is delete the goalDone from the Database
		User.updateGoal({
			    "username" : $scope.data.username , 
			    "goal" : { "title" : goalDone } ,
			    "method" : "-1"})
			.then(function(response){
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
	}
	$scope.createTask = function(recentTask){
		User.updateGoal({ username : $scope.data.username ,  goal : { title : recentTask} , method : 1})
			.then(function(response){
				console.log(response.data.goals);
				$scope.todos = response.data.goals;
			})
			.catch(function(error){
				console.log(error);
			})
 	}
});

