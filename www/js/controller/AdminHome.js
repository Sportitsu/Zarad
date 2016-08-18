'use strict';

angular.module('zarad.admin',[])

.controller('AdminController',function($scope, $window, $location,Admin, $state, $ionicPopup, $timeout, Club, Tournament){
  $scope.admin={};
	$scope.club = {};
  $scope.tournament = {};
  $scope.user={};
  $scope.admins={};
  $scope.adminSelect={};
  $scope.clubs = {};
  $scope.clubSelect={};
  $scope.tournaments={};
  $scope.tournamentSelect={};
  $scope.adminUsername = $window.localStorage.getItem('admin');

 
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

  //this is Admin log in pop up 
  $scope.showPopup = function() {
 //custom popup to show login box
 var myPopup = $ionicPopup.show({
  template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" id="n" placeholder="Enter First Name" ng-model="admin.username"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="password" placeholder="Enter your password" ng-model="admin.password"></label>',
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
       onTap: function(e) {

         if (!$scope.admin.username || !$scope.admin.password) {
           //don't allow the admin to close unless they fill the fields
           e.preventDefault();
         } else {
           $scope.signin();
         }
       }
     },
   ]
 });
 myPopup.then(function(){
  $scope.admin = '';
 })
};

  //admin sign in
  $scope.signin=function(){
    Admin.signin({username: $scope.admin.username, password:$scope.admin.password})
    .then(function(resp){
      $window.localStorage.setItem('admin',resp.user);
      $window.localStorage.setItem('com.zarad',resp.token);
      $location.path('/AdminAction')
    })
  };

  $scope.signout=function(){
    Admin.signout();
  }
  //get a list of all admins
  $scope.getAdmins =function () {
    Admin.getAdmins()
    .then(function (admins) {
      $scope.admins.data = admins;
    });
  };

  //get a list of all clubs 
  $scope.getClubs = function () {
    Club.getClubs()
    .then(function (clubs) {
      $scope.clubs.data = clubs;
    });
  };

  //get all Tournaments
  $scope.getTournaments = function () {
    Tournament.getAllTournament()
    .then(function (tournaments) {
      $scope.tournaments.data = tournaments;
    });
  };

  //search for a specific tournament
  $scope.SearchAboutTournament=function(){
    $scope.massage=" ";
    Tournament.SearchAboutTournament($scope.tournamentSelect.value)
    .then(function(tournament){
        $scope.tournament.name=tournament.data.name;
        $scope.tournament.place=tournament.data.place;
        $scope.tournament.details=tournament.data.details;
        $scope.tournament.organizer=tournament.data.organizer;
        $scope.tournament.Date=tournament.data.Date;
        $scope.tournament.poster=tournament.data.poster;
    }).catch(function(error){
      $scope.massage="Tournament Not Found";
    });
  };

  $scope.getAdmins();
  $scope.getClubs();
  $scope.getTournaments();

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
            $scope.adminSelect = '';
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
            $scope.admin = '';
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
    template : '<select ng-model="clubSelect.value"><option ng-repeat="club in clubs.data">{{club.username}}  {{club.clubName}}</option></select>',
    title: '<p>Please select Club to delete</p>',
     subTitle: 'Please select Club Username',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Remove</b>',
         type: 'button button-assertive icon icon-left ion-trash-a',
         onTap: function(e) {
           Club.removeClub({username : $scope.clubSelect.value.split(" ")[0]}).then(function (resp) {
            $scope.club.username = '';
            $scope.getClubs();
            var alertPopup = $ionicPopup.alert({
              title : resp
            });
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
            $scope.club = '';
            var alertPopup = $ionicPopup.alert({
             title: 'Your User Name is:'+resp.username
              });
          });
         }
       },
     ]
   });
  };


   
  // Create new tournament
  $scope.addTournament = function () {
    var Create = $ionicPopup.show({
    template: '<label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament Name" ng-model="tournament.name"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament place" ng-model="tournament.place"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Details" ng-model="tournament.details"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament organizer" ng-model="tournament.organizer"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament Date" ng-model="tournament.Date"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input class="bottom-marg-15" type="button" value="choose Poster" ng-click="upload()"></label> <br>',
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
            $scope.tournament = '';
            $location.path('/AllTournament');
          })
         }
       },
     ]
   });
  };
  // Remove tournament 
  $scope.removeTournament = function () {

    var remove = $ionicPopup.show({
    template :'<select ng-model="tournamentSelect.value"><option ng-repeat="tournament in tournaments.data">{{tournament.name}}</option></select>',
    title: '<p>Please Select Tournament Name to delete</p>',
     subTitle: 'Please Tournament Name from the list',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },
       {
         text: '<b>Remove</b>',
         type: 'button button-assertive icon icon-left ion-trash-a',
         onTap: function(e) {
          Tournament.DeleteTournament({name:$scope.tournamentSelect.value})
          .then(function (resp) {
            $scope.getTournaments();
            var alertPopup = $ionicPopup.alert({
              title : resp
            });
          });
         }
       },
     ]
   });
  };
  // Edit tournament function 
  $scope.editTournament = function () {

    var Edit = $ionicPopup.show({
    template: '<select ng-model="tournamentSelect.value"><option ng-repeat="tournament in tournaments.data">{{tournament.name}}</option></select><br><button ng-click="SearchAboutTournament()">Get Data</button><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament place" ng-model="tournament.place"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Details" ng-model="tournament.details"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament organizer" ng-model="tournament.organizer"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament Date" ng-model="tournament.Date"></label><br><label class="item item-input"><i class="icon ion-arrow-right-b placeholder-icon"></i><input type="text" placeholder="Tournament Poster" ng-model="tournament.poster"></label><br>',
    title: '<p>Edit Existing Tournament</p>',
     subTitle: 'Please select from below and click Get Data',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
       type: 'button button-outline icon icon-left ion-close-round button-dark bt',
        },{
         text: '<b>Edit</b>',
         type: 'button button-balanced icon icon-left ion-edit',
         onTap: function(e) {
          Tournament.EditTournament($scope.tournament)
          .then(function (resp) {
            $scope.tournament = '';
            $location.path('/AllTournament');
          });
         }
       },
     ]
   });
  };
});

