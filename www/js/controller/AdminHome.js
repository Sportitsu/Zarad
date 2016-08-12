'use strict';
angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin, $state, $ionicPopup, $timeout){
  $scope.admin={};
	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};
  $scope.admins={};
  $scope.adminSelect={};

  //admin signup
  $scope.signup=function(){
    Admin.signup($scope.admin).then(function(resp){
      $location.path('/AdminSignin');
    })
  };

  //admin sign in
  $scope.signin=function(){
    Admin.signin({username: $scope.admin.username, password:$scope.admin.password})
    .then(function(resp){
      console.log(resp);
      $location.path('/AdminAction')
    })
  };

  $scope.removeAdmin = function () {
    console.log($scope.adminSelect)
    Admin.deleteAdmin({username:$scope.adminSelect.value})
          .then(function (admin) {
            $scope.getAdmins();
    });
  }

  //add club function
  $scope.Addclub =function(){
  	Admin.Addclub($scope.club)
  	.then(function(resp){
      $location.path('/clubprofile/'+resp.data.username);
    });
  };

  //get a list of all admins
  $scope.getAdmins =function () {
    Admin.getAdmins()
    .then(function (admins) {
      $scope.admins.data = admins;
    });
  };
  $scope.getAdmins();

  //delete admin function
  $scope.deleteAdmin = function () {
    
    var myPopup = $ionicPopup.show({
    template: '<select ng-model="adminSelect.value"><option ng-repeat="admin in admins.data">{{admin.username}}</option></select>',
    title: '<p>Enter Admin UserName to delete</p>',
     subTitle: 'Please select Admin from the list',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Remove Admin</b>',
         type: 'button button-outline icon icon-left ion-trash-a button-dark bt',
         onTap: function(e) {
           $scope.removeAdmin();
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 1 minute
   }, 60000);
  };
});
