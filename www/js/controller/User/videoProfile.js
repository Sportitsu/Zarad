angular.module('zarad.videos', ['ionic'])
.controller('VideosController', function($scope, User, Auth, $window, Club, $location, $http){
  $scope.flag = true;
  $scope.data = JSON.parse($window.localStorage.member);
    // User.getUser(JSON.parse($window.localStorage.member).username)
    //     .then(function(response){
    //       console.log(response.data);
    //       $scope.data = response.data;
    //     })
    //     .catch(function(error){
    //       console.log(error);
    //     })

    $scope.init= function(){
      alert(1);
    }

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

      	$scope.videos = [];
            $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
            angular.forEach(response.items, function(child){
              $scope.videos.push(child);
            });
          })
    }
      

    
})
