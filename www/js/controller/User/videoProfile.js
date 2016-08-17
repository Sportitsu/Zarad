angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, Club, $location, $http){

  $scope.data = JSON.parse(window.localStorage.getItem('user'));
  Club.getClubForUser({clubName : $scope.data.club})
      .then(function(response){
        $scope.flag = true;
        $scope.myClub = response.data;
        $scope.uploadPage();
      })
      .catch(function(error){
        $scope.flag = false;
        // console.log(error);
      });

  console.log($scope.data.club);

$scope.uploadPage = function(){
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
        channelId: $scope.myClub.channelId,
      }

  	$scope.videos = [];
        $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
        angular.forEach(response.items, function(child){
          $scope.videos.push(child);
        });
      })
}

    
})
