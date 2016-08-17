angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, Club, $location, $http){

  $scope.data = JSON.parse(window.localStorage.getItem('user'));

  Club.getClubForUser({clubName : $scope.data.club})
      .then(function(response){
        console.log(response.data);
      })
      .catch(function(error){
        console.log(error);
      })

	$scope.playerVars = {
	  rel: 0,
	  showinfo: 0,
	  modestbranding: 0,
	}

  var YOUTUBE_API_KEY2 = 'AIzaSyCe3SQ2EGPUgyqeW5PXscj8i4cN47Sck8Y';

  $scope.youtubeParams = {
      key: YOUTUBE_API_KEY2,
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
        console.log(child);
        $scope.videos.push(child);
      });
    })
    
})
