angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, $location, $http){
	$scope.playerVars = {
	  rel: 0,
	  showinfo: 0,
	  modestbranding: 0,
	}

    $scope.youtubeParams = {
      key: 'AIzaSyCe3SQ2EGPUgyqeW5PXscj8i4cN47Sck8Y',
      type: 'video',
      maxResults: '5',
      part: 'id,snippet',
      q: '',
      order: 'date',
      channelId: 'UCet7ZVoSfu1QWwlVxua12Gg',
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
