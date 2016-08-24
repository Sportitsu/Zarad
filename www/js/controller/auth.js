'use strict';
angular.module('zarad.auth',[])
.controller('AuthController',function($scope ,$location, User, $window , Auth, $ionicPopup){
	$scope.user={};
  $scope.onTap = function(e) {
           if (!$scope.user.username || !$scope.user.password) {
             //don't allow the user to close unless they fill the fields
             e.preventDefault();
           } else {
             // return $scope.user;

             $scope.signin();

           }
         };
	
  $scope.showPopup = function() {
   //custom popup to show login box
   $ionicPopup.show({
   	template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" id="n" placeholder="Enter First Name" ng-model="user.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter your password" ng-model="user.password"></label>',
   	title: '<p>Enter your login information</p>',
     subTitle: 'Please fill all the fields',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Login</b>',
         type: 'button button-outline icon icon-left ion-unlocked button-dark bt',
         onTap: $scope.onTap
       },
     ]
   });
  };

	$scope.signin =function(){
     Auth.signin($scope.user)
  	.then(function(resp){
      $scope.user = {};
     if(resp.status !== 500){
     if(resp.data.user.indexOf('Cl') > -1){
        $window.localStorage.setItem('com.zarad', resp.data.token);
        $window.localStorage.setItem('user',resp.data.user);
        $location.path('/club');
      }else if(resp.data.user.indexOf('Pl') > -1){
        $scope.setWindowUser(resp.data);
      }
      }
      else{
        $ionicPopup.alert({
            title: resp.data
        });
    }
  });
};

  $scope.setWindowUser = function(resp){                                          
       User.getUser(resp.user)
       .then(function(response){
        if(response){
          if(response.data.valid){
            $window.localStorage.setItem('com.zarad', resp.token);
            $window.localStorage['member'] = angular.toJson(response.data);
            $location.path('/userprofile/home');
          }
        }else {
            console.log('Please resubscribe');
          }
       })
       .catch(function(error){
        $scope.error = error;
       });
  };
});
