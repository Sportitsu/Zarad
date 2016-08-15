'use strict';

angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin, $state, $ionicPopup, $timeout, Club, Tournament){
  $scope.admin={};
	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};
  $scope.admins={};
  $scope.adminSelect={};

 
  $scope.upload = function() {
    //imgur id
    var  IMGUR_CLIENT_ID = 'e5483dd45cb276b';
    // upload to imgur function
    var uploadToIMGUR = function(client_id, imgData, callback) {
      $.ajax({
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID ' + client_id,
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
    // git data from local machine and translate it to 64 base image
     var fileBt = $('<input>').attr('type','file');
     fileBt.on('change', () => {
      var file = fileBt[0].files[0];
      var reader = new FileReader();
      reader.addEventListener('load', ()=>{
        var imgData = reader.result.slice(23);
        // sending the decoded image to IMGUR to get a link for that image
        uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
          $scope.tournament.poster = result.link;
        });
      })
      // using the reader to decode the image to base64
      reader.readAsDataURL(file);
    })
     fileBt.click();
            

  };

  //admin sign in
  $scope.signin=function(){
    Admin.signin({username: $scope.admin.username, password:$scope.admin.password})
    .then(function(resp){
      $location.path('/AdminAction')
    })
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
    
    var remove = $ionicPopup.show({
    template: '<select ng-model="adminSelect.value"><option ng-repeat="admin in admins.data">{{admin.username}}</option></select>',
    title: '<p>Enter Admin UserName to delete</p>',
     subTitle: 'Please select Admin from the list',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Remove</b>',
         type: 'button button-assertive icon icon-left ion-trash-a',
         onTap: function(e) {
           Admin.deleteAdmin({username:$scope.adminSelect.value})
          .then(function (admin) {
            $scope.getAdmins();
          });
         }
       },
     ]
   });
  };
  //Register a new Admin
  $scope.registerAdmin = function () {

    var register = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin Username" ng-model="admin.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Admin Password" ng-model="admin.password"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin Email" ng-model="admin.email"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin FirstName" ng-model="admin.firstName"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin LastName" ng-model="admin.lastName"></label>',
    title: '<p>Enter Admin UserName to delete</p>',
     subTitle: 'Please select Admin from the list',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Register</b>',
         type: 'button button-balanced icon icon-left ion-person-add',
         onTap: function(e) {
           Admin.signup($scope.admin).then(function(resp){
           $location.path('/AdminSignin');
          });
         }
       },
     ]
   });
  };
  //Register a new Admin
  $scope.registerAdmin = function () {

    var register = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin Username" ng-model="admin.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Admin Password" ng-model="admin.password"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin Email" ng-model="admin.email"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin FirstName" ng-model="admin.firstName"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Admin LastName" ng-model="admin.lastName"></label>',
    title: '<p>Enter Admin UserName to delete</p>',
     subTitle: 'Please select Admin from the list',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Register</b>',
         type: 'button button-balanced icon icon-left ion-person-add',
         onTap: function(e) {
           Admin.signup($scope.admin).then(function(resp){
           $location.path('/AdminSignin');
          });
         }
       },
     ]
   });
  };
  // Delete existing club 
  $scope.removeClub = function () {

    var remove = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Club Username" ng-model="club.username"></label>',
    title: '<p>Enter Club UserName to delete</p>',
     subTitle: 'Please Enter Club Username',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Remove</b>',
         type: 'button button-assertive icon icon-left ion-trash-a',
         onTap: function(e) {
           Club.removeClub({username : $scope.club.username}).then(function (resp) {
             $location.path('/AdminAction');
           });
         }
       },
     ]
   });
  };
  // Create new Club
  $scope.Addclub = function () {

    var Create = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Club Password" ng-model="club.password"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Club Name" ng-model="club.clubName"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Country" ng-model="club.country"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="email" placeholder="Email" ng-model="club.email"></label>',
    title: '<p>Creating New Club</p>',
     subTitle: 'Please fill the following fields',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },{
         text: '<b>Create</b>',
         type: 'button button-balanced icon icon-left ion-plus-circled',
         onTap: function(e) {
          Club.Addclub($scope.club).then(function (resp) {
            var alertPopup = $ionicPopup.alert({
             title: 'Your User Name is:'+resp.username,
             template: '{{resp.username}}'
              });
          });
         }
       },
     ]
   });
  };


    $scope.Empty=function(){
    $scope.tournament.name=" ";
    $scope.tournament.place=" ";
    $scope.tournament.details=" ";
    $scope.tournament.organizer=" ";
    $scope.tournament.Date=" ";
    $scope.tournament.poster=" ";
  }
  // Create new tournament
  $scope.addTournament = function () {
    var Create = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament Name" ng-model="tournament.name"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament place" ng-model="tournament.place"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Details" ng-model="tournament.details"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament organizer" ng-model="tournament.organizer"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="date" placeholder="Tournament Date" ng-model="tournament.Date"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input class="bottom-marg-15" type="button" value="choose Poster" ng-click="upload()"></label> <br>',
    title: '<p>Creating New Tournament</p>',
     subTitle: 'Please fill the following fields',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },{
         text: '<b>Create</b>',
         type: 'button button-balanced icon icon-left ion-plus-circled',
         onTap: function(e) {
          Tournament.AddTournament($scope.tournament)
          .then(function (resp) {
            $location.path('/AllTournament');
          })
         }
       },
     ]
   });
  };
});

