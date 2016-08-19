angular.module('zarad.home', ['ionic'])
.controller('UserHomeController' , function($scope, $state, User, $window){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
	$scope.data = JSON.parse($window.localStorage.member);
	// $scope.todo = {};
	$scope.todos = $scope.data.goals;
	console.log($scope.todos);


	$scope.updateTodo = function(goalDone){
		// Todo is delete the goalDone from the Database
		console.log(goalDone);
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
})
.service('Todo', function(User, $window) { 
	
	var todos = [
	  { task  : 'Eat Healthy Food'}
	  ,
	  {task : 'Drill Half Guard 1000 Times'}
	  ,
	  {task : 'Run 1000 M in 2 minutes'}
	]
    this.list = function() {
    	console.log(member.username);
    	User.updateGoal()

        return todos;
    }
 
    this.add = function(todo) {
        todos.splice(0, 0, todo);
    }
});

