angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, $location, $http){
	$scope.playerVars = {
	  rel: 0,
	  showinfo: 0,
	  modestbranding: 0,
	}

    $scope.youtubeParams = {
      key: 'AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs',
      type: 'video',
      maxResults: '5',
      part: 'id,snippet',
      q: 'creatorup',
      order: 'date',
      channelId: 'UCeEqIv7lVwOOLnwxuuhQFuQ',
    }

	$scope.videos = [];
      $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        $scope.videos.push(child);
      });
    })
    .error(function(response, status){
      console.log("Error while received response. " + status + response);
    });
})
