angular.module('zarad.user',['ionic'])
.controller('UserProfileController',
 function($scope, $ionicPopup, Auth, $cordovaCamera, $ionicModal, $ionicLoading,$location, $window, $ionicPlatform, User, ionicMaterialMotion, ionicMaterialInk, $timeout){
 
 $scope.data = JSON.parse($window.localStorage.member);
 $scope.achievements = $scope.data.achievements;
   
    for(var i = 0; i < $scope.achievements.length; i++){
      if($scope.achievements[i].place === '1' ){
        $scope.achievements[i].place = 'First Place ';
      } else if($scope.achievements[i].place === '2' ){
        $scope.achievements[i].place = 'Second Place ';
      } else if($scope.achievements[i].place === '3' ){
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

   $ionicModal.fromTemplateUrl('js/templates/User/profile-friendPage.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(friendProfile) {
      console.log(friendProfile);
      $scope.friendProfile = friendProfile;
   });



   $ionicModal.fromTemplateUrl('js/templates/User/profile-friends.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(friends) {
      console.log(friends);
      $scope.friends = friends;
   });

    $ionicModal.fromTemplateUrl('js/templates/User/profile-fullImage.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.biggerImage = function(){
      $scope.modal.show();
    }
    $scope.closeModal = function() {
      $scope.modal.hide();
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
      });
   }



   if($scope.data.resub){
    setTimeout(function(){
     setInterval(function(){
      $('#resubscribe').fadeToggle();
     },2000)
    },1000);
   }
   

   $scope.showFriends = function(){
     $scope.friends.show();
   }

   $scope.closeLogin = function(){
    console.log('clicked');
     $scope.friends.hide();
   }

   $scope.myFriends = [];
   User.getAllUsers()
       .then(function(response){
         for(var i = 0 ; i < response.data.length; i++){
          if($scope.data.club === response.data[i].club && response.data[i].username !== $scope.data.username){
            $scope.myFriends.push(response.data[i]);
          }
         }
         console.log($scope.myFriends);
       })
       .catch(function(error){
         console.log(error);
       });



   $scope.showProfile = function(objectFriend){
    $scope.displayFriend = objectFriend;
    $scope.friendAchievements = objectFriend.achievements;
    for(var i = 0; i < $scope.friendAchievements.length; i++){
      console.log($scope.friendAchievements[i]);
      console.log(1);
      if($scope.friendAchievements[i].place === '1' ){
        $scope.friendAchievements[i].place = 'First Place ';
      } else if($scope.friendAchievements[i].place === '2' ){
        $scope.friendAchievements[i].place = 'Second Place ';
      } else if($scope.friendAchievements[i].place === '3' ){
        $scope.friendAchievements[i].place = 'Third Place ';
      }
    }
    $scope.friendProfile.show();

   }
   $scope.goBack = function(){
    $scope.friendProfile.hide();
   }    

     // setInterval(function(){
     //  User.getUser($scope.data.username)
     //      .then(function(response){
     //        if(JSON.stringify(response.data) !== $window.localStorage.member){
     //          $scope.data = response.data;
     //        }
     //      })
     //      .catch(function(error){
     //        console.log(error);
     //      })
     // },3000)

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

.controller('newController' , function($scope){
  console.log('hello');
})

