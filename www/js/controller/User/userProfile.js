angular.module('zarad.user',['ionic'])
.controller('UserProfileController',
 function($scope, $ionicPopup, Auth, $cordovaCamera, $ionicLoading,$location, $window, $ionicPlatform, User, ionicMaterialMotion, ionicMaterialInk, $timeout){
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

  $scope.showOptions = function(){
    var myPopup = $ionicPopup.show({
      titleText : 'Please Select',
      scope : $scope,
      buttons : [
         { text: '<h6>Camera</h6>' ,
           type: 'button button-outline' ,
           onTap : function(){
            $scope.takePhoto({type : Camera.PictureSourceType.CAMERA })
            console.log('Clicked On Camera');
           } },
      { text: '<h6>Photos</h6>',
        type: 'button button-outline',
        onTap : function(){
          $scope.takePhoto({type : Camera.PictureSourceType.PHOTOLIBRARY })
        }},
        {text: 'exit'}
      ]
    })
  };

    var uploadToIMGUR = function(client_id, imgData, callback) {
        $.ajax({
          url: 'https://api.imgur.com/3/image',
          headers: {
            'Authorization': 'Client-ID ' + 'e5483dd45cb276b',
            'Accept': 'application/json'
          },
          type: 'POST',
          data: {
            'image': imgData,
            'type': 'base64'
          },
          success: function success(res) {

            if (callback) {
              callback(res.data);
            }
          }
        });
      };

 $scope.takePhoto = function(source){
    var options = {
      quality : 50,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : source.type ,
      allowEdit: true ,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    $cordovaCamera.getPicture(options) 
                  .then(function(imageData){
                    uploadToIMGUR('',imageData, function(response){
                      alert('this is one ' + response.link );
                      var object = {
                        username  : $scope.data.username ,
                        image : response.link
                      }
                      $scope.data.image = response.link;
                      User.editProfile(object)
                          .then(function(response){
                            alert('WhatsApp Guyss');
                            $scope.data.image = response.image;
                          })
                          .catch(function(error){
                            alert(error);
                          })
                    })
                    // $scope.image = imageData;
    });
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


