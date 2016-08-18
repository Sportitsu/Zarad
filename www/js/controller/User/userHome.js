angular.module('zarad.home', ['ionic'])
.controller('UserHomeController' , function($scope, $state, Todo){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true
	// $scope.todo = {};
	$scope.todos = Todo.list();



	$scope.updateTodo = function(goalDone){
		// Todo is delete the goalDone from the Database
	}

	$scope.createTask = function(recentTask){
		$scope.todos.push({task : recentTask });
	}
 
})
.service('Todo', function(User) { 
	var todos = [
	  { task  : 'Eat Healthy Food'}
	  ,
	  {task : 'Drill Half Guard 1000 Times'}
	  ,
	  {task : 'Run 1000 M in 2 minutes'}
	]
    this.list = function() {
        return todos;
    }
 
    this.add = function(todo) {
        todos.splice(0, 0, todo);
    }
});

