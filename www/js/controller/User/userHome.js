angular.module('zarad.home', ['ionic'])
.controller('UserHomeController' , function($scope, $state, User, $window, Quotes, $timeout){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
	$scope.data = JSON.parse($window.localStorage.member);
	$scope.todos = $scope.data.goals;
	$scope.quotes = [];

	$scope.updateTodo = function(goalDone){
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
 	};

 	$scope.doRefresh = function(){
 		$timeout(function(){
 			Quotes.getQuotes()
 		  .then(function(response){
 		  	$scope.quotes = [];
 		  	for(var i = 0 ; i < 4; i++){
 		  		var random = Math.floor(Math.random()*response.length);
 		  		if($scope.quotes.indexOf(response[random]) === -1){
 		  			$scope.quotes.push(response[random]);
 		  		}
 		  	}
 		  })
 		  .catch(function(error){
 		  	console.log(error);
 		  });
 		   $scope.$broadcast('scroll.refreshComplete');
 		},1000);
 		
 	}


 	Quotes.getQuotes()
 		  .then(function(response){
 		  	for(var i = 0 ; i < 4; i++){
 		  		var random = Math.floor(Math.random()*response.length);
 		  		if($scope.quotes.indexOf(response[random]) === -1){
 		  			$scope.quotes.push(response[random]);
 		  		}
 		  	}
 		  })
 		  .catch(function(error){
 		  	console.log(error);
 		  });

});

