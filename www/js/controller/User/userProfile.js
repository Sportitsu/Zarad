angular.module('zarad.user',['ionic'])
.controller('UserProfileController',
 function($scope, $ionicPopup, Auth, $location, $window, $ionicPlatform, User, ionicMaterialMotion, ionicMaterialInk, $timeout){
 $scope.user = {};
 $scope.data = JSON.parse(window.localStorage.user);
 $scope.achievements = $scope.data.achievements;
  for(var i = 0; i < $scope.achievements.length; i++){

    if($scope.achievements[i].place === '1' ){
      $scope.achievements[i].place = 'First Place ';
    } else  if($scope.achievements[i].place === '2' ){
      $scope.achievements[i].place = 'Second Place ';
    } else  if($scope.achievements[i].place === '3' ){
      $scope.achievements[i].place = 'Third Place ';
    }
  }

 if($scope.data.resub){
  setTimeout(function(){
   setInterval(function(){
    $('#resubscribe').fadeToggle();
   },2000)
  },1000);
 }
 
 $scope.test = function(){
  console.log('test');
 }

  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Please Renew Your Subscription',
       text : 'Contact your gym as soon as possible'

   });
     alertPopup.then(function(res) {
       console.log('Thank you for helping us fix that ' + type);
     });
   };


   setInterval(function(){
    User.getUser($scope.data.username)
        .then(function(response){
          if(JSON.stringify(response.data) !== window.localStorage.user){
            $scope.data = response.data;
            window.localStorage.user = angular.toJson(response.data);
          }
        })
        .catch(function(error){
          console.log(error);
        })
   },3000)

       // Set Header    
    $scope.isExpanded = false;


    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 500);

    // Set Ink
    ionicMaterialInk.displayEffect();
})
