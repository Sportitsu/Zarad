angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, $window, Club, $location, $http){
  $scope.videos = [];
  $scope.flag = true;
  $scope.data = JSON.parse($window.localStorage.member);
    Club.getClubForUser({clubName : $scope.data.club})
        .then(function(response){
          if(response.data.channelId){
            $scope.flag = true;
            $scope.myClub = response.data;
            $scope.uploadPage();
          } else {
            $scope.flag = false;
          }
        })
        .catch(function(error){
          $scope.flag = false;
        });

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
            maxResults: '10',
            part: 'id,snippet',
            q: '',
            order: 'date',
            channelId: $scope.myClub.channelId,
          }

          $scope.getVideo();
    }
      
    $scope.getVideo = function(){
      // $http({
      //   method : 'GET',
      //   params : $scope.youtubeParams ,
      //   url : 'https://www.googleapis.com/youtube/v3/search'})
      // .then(function(response){
      //   angular.forEach(response.data.items, function(child){
      //    $scope.videos.push(child);
      //   })
      // })
      // .catch(function(error){
      //   console.log(error);
      // })
      $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
        angular.forEach(response.items, function(child){
          $scope.videos.push(child);
        });
      })      
    }
    
})
