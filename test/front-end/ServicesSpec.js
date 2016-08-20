'use strict';

describe('Services', function () {
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';
  var baseUrl = 'http://zarad.herokuapp.com';
  // Before each test load our lets-hangout.services module
  beforeEach(angular.mock.module('zarad.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('Auth factory', function() {
    var $httpBackend, Auth, $window;

    // Before each test set our injected Auth factory (_Auth_) to our local Users variable
    beforeEach(inject(function(_$httpBackend_, _Auth_, _$window_) {
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $window = _$window_;
    }));

    // A test to verify the Auth factory exists
    it('Auth factory should exist', function() {
      expect(Auth).toBeDefined();
    });
    
    describe('.signup()', function() {
      // A test to verify the method signup exists
      it('signup should exist', function() {
        expect(Auth.signup).toBeDefined();
      });

      it('signup should POST data and username should start with Pl', function() {
        var mockResponse = 
          {
            'username':'Plmiha492',
            'password': 'play',
            'firstName' : 'Mihyar',
            'lastName' : 'almaslama',
            'country' : 'Syria',
            'email' : 'mihyar@gmail.com'
          }

        $httpBackend.expect('POST', baseUrl + '/api/user/signup').respond(201,mockResponse);

        Auth.signup().then(function (resp) {
          expect(resp.username[0]).toEqual('P');
          expect(resp.username[1]).toEqual('l');
        });
        $httpBackend.flush();
      });
    });

  describe('signin()', function(){

      it('should exist', function(){
        expect(Auth.signin).toBeDefined();
      });

      it('should return token when a user signin', function(){
        $httpBackend.expect('POST', baseUrl + '/api/user/signin').respond(200,{token:token});
        Auth.signin().then(function(resp){
        expect(resp.token).toEqual(token);
        });
        $httpBackend.flush();
      });
    });
  describe('signout()', function(){

      it('should exist', function(){
        expect(Auth.signout).toBeDefined();
      });

      it('should clear localStorage when logout', function(){
        $window.localStorage.setItem('com.zarad',token);
        Auth.signout();
        expect($window.localStorage.getItem('com.zarad')).toEqual(null);
      });
  });
  describe('isAuth()', function(){

      it('should exist', function(){
        expect(Auth.isAuth).toBeDefined();
      });

      it('should return true if the user is signed in', function(){
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';
        $window.localStorage.setItem('com.zarad', token);
        expect(Auth.isAuth()).toEqual(true);
      });
  });
  describe('checkUser()', function(){

      it('should exist', function(){
        expect(Auth.isAuth).toBeDefined();
      })

      it('should return admin when admin logs in and user when user or club logs in', function(){
        $window.localStorage.setItem('admin', token);
        expect(Auth.checkUser()).toEqual('admin');
        $window.localStorage.clear();
        $window.localStorage.setItem('user', token);
        expect(Auth.checkUser()).toEqual('user');
      });
    });
  });
///////////////////Admin factiry tests ///////////////////////////////////////
  describe('Admin factory', function(){
      var $httpBackend, Admin, $window;
      var mockResponse = [
        {
          username : "mihyar",
          email : "mihyar@gmail.com",
          firstName : "mihyar",
          lastName : "almasalma",
          _id : "57aaebbde482740300f4e0ee"
        },{
          username : "mohammad",
          email : "mohammad@gmail.com",
          firstName : "Mohammad",
          lastName : "Al-Bakri",
          _id : "57b5735791804d0300a2f7d5"
        }
        ];

      beforeEach(inject(function(_$httpBackend_, _Admin_, _$window_){
        $httpBackend = _$httpBackend_;
        Admin = _Admin_;
        $window = _$window_;
      }));

        it('Admin factory should exist', function(){
          expect(Admin).toBeDefined();
        });

    describe('signin()', function(){

        it('should exist',function(){
          expect(Admin.signin).toBeDefined();
        });

        it('should return a token when Admin signin', function(){
          $httpBackend.expect('POST', baseUrl + '/api/admin/signin').respond(200,{token:token});
          Admin.signin().then(function(resp){
          expect(resp.token).toEqual(token);
          });
          $httpBackend.flush();
        });
    });
    describe('signup()', function(){

        it('should exist', function(){
          expect(Admin.signup).toBeDefined();
        });

        it('should signup a new Admin', function(){
          var mockAdmin = 
          {
            'username' : 'power',
            'firstName' : 'education',
            'email' : 'RBK@gmail.com'
          }
          $httpBackend.expect('POST', baseUrl + '/api/admin/create').respond(201,mockAdmin);
          Admin.signup().then(function(resp){
            expect(resp.username).toEqual(mockAdmin.username);
            expect(resp.password).toEqual(undefined);
            expect(resp.email).toEqual(mockAdmin.email);
          });
          $httpBackend.flush();
        });
    });
    describe('signout()', function(){

        it('should exist', function(){
          expect(Admin.signout).toBeDefined();
        });

        it('shoudl clear localStorage on signout', function(){
          $window.localStorage.setItem('com.zarad',token);
          Admin.signout();
          expect($window.localStorage.getItem('com.zarad')).toEqual(null);
        });
    });
    describe('getAdmins()', function(){

        it('should exist', function(){
          expect(Admin.getAdmins).toBeDefined();
        });

        it('should return an array of admins 200(Success)', function(){

          $httpBackend.expect('GET', baseUrl + '/api/admin/admins').respond(200,mockResponse);
          Admin.getAdmins().then(function(resp){
            expect(resp[0].username).toEqual(mockResponse[0].username);
            expect(resp[1].username).toEqual(mockResponse[1].username);
          });
          $httpBackend.flush();
        });
    });
    describe('deleteAdmin()',function(){

        it('should exist', function(){
          expect(Admin.deleteAdmin).toBeDefined();
        });

        it('should remove existing admin 201(Success)', function(){
          $httpBackend.expect('POST', baseUrl + '/api/admin/delete').respond(201,'Admin Deleted');
          Admin.deleteAdmin(mockResponse[0].username).then(function(resp){
            expect(resp).toEqual('Admin Deleted');
          });
          $httpBackend.flush();
        });
    });
  });
////////////////////////Club factory tests //////////////////////////////
  describe('Club factory', function(){
    var $httpBackend, Club;
    var mockResponse = 
          {
            'username':'Plmiha492',
            'firstName' : 'Mihyar',
            'lastName' : 'almaslama',
            'country' : 'Syria',
            'email' : 'mihyar@gmail.com', 
            'clubName' : 'Makhai'
          };

    beforeEach(inject(function(_$httpBackend_, _Club_){
      $httpBackend = _$httpBackend_;
      Club = _Club_;
    }));

    it('should exist', function(){
      expect(Club).toBeDefined();
    });

  describe('AddUser()', function(){

    it('should exist', function(){
      expect(Club.AddUser).toBeDefined();
    });

    it('should be able to register new users to a club 201(Success)', function(){

      $httpBackend.expect('POST', baseUrl + '/api/club/register').respond(201,mockResponse);
      Club.AddUser(mockResponse).then(function(resp){
        expect(resp.password).toEqual(undefined);
        expect(resp.username[0]).toEqual('P');
        expect(resp.username[1]).toEqual('l');
        expect(resp.clubName).toEqual(mockResponse.clubName);
      });
      $httpBackend.flush();
    });
  });

  describe('getClub()', function(){

    it('should exist', function(){
      expect(Club.getClub).toBeDefined();
    });

    it('should return a club given a club username', function(){
      var username = mockResponse.username;

        $httpBackend.expect('GET', baseUrl + '/api/club/x/'+username).respond(200, mockResponse);
        Club.getClub(username).then(function(resp){
          expect(resp.username).toEqual(mockResponse.username);
        });
        $httpBackend.flush();
    });
  });

  describe('getClubForUser', function(){

    it('should exist', function(){
      expect(Club.getClubForUser).toBeDefined();
    });

    it('should return the Club information by clubName', function(){

      $httpBackend.expect('POST', baseUrl + '/api/club/getclub').respond(200,mockResponse);
      Club.getClubForUser(mockResponse.clubName).then(function(resp){
        expect(resp.data.clubName).toEqual(mockResponse.clubName);
      });
      $httpBackend.flush();
    });
  });

  describe('Addclub', function(){

      it('should exist', function(){
        expect(Club.Addclub).toBeDefined();
      });

      it('should be able to add a new club', function(){

        $httpBackend.expect('POST', baseUrl + '/api/club/register').respond(201,mockResponse);
        Club.Addclub(mockResponse).then(function(resp){
          expect(resp.clubName).toEqual(mockResponse.clubName);
        });
        $httpBackend.flush();
      });
  });

  describe('removeClub()', function(){
      
      it('should exist', function(){
        expect(Club.removeClub).toBeDefined();
      });

      it('should be able to remove a club give a clubName', function(){

        $httpBackend.expect('POST', baseUrl + '/api/club/delete').respond(201, 'Club Deleted');
        Club.removeClub(mockResponse.clubName).then(function(resp){
            expect(resp).toEqual('Club Deleted');
        });
        $httpBackend.flush();
      });
  });

  describe('getClubs()', function(){

      it('should exist', function(){
        expect(Club.getClubs).toBeDefined();
      });

      it('should return an array of all the clubs', function(){

        var mockClubs = [{
              'username':'Clmiha492',
              'firstName' : 'Mihyar',
              'lastName' : 'almaslama',
              'country' : 'Syria',
              'email' : 'mihyar@gmail.com', 
              'clubName' : 'Makhai'
            },{
              'username' : 'Clazoz793',
              'firstName' : 'azoz',
              'lastName' : 'Alrawi',
              'country' : 'Iraq',
              'email' : 'azoz@gmail.com',
              'clubName' : 'azoz international'
            }]

          $httpBackend.expect('GET', baseUrl + '/api/clubs').respond(200,mockClubs);
          Club.getClubs().then(function(resp){
            expect(resp).toEqual(mockClubs);
          });
        $httpBackend.flush();
      });
    });
  });
//////////////////////////////// user factory ////////////////////////
  describe('User factory', function(){

    var $httpBackend, User;
    var mockResponse = {
      'username' : 'Plmoha492',
      'emai' : 'mohammad@gmail.com',
      'firstName' : 'mohammad',
      'lastName' : 'Ali Klai',
      'beltColor' : 'purple',
      'club' : 'Makhai',
      'country' : 'Jordan'
    };

    beforeEach(inject(function(_$httpBackend_, _User_){
      $httpBackend = _$httpBackend_;
      User = _User_;
    }));

    it('should exist', function(){
      expect(User).toBeDefined();
    });

    describe('getUser()', function(){

        it('should exist', function(){
          expect(User.getUser).toBeDefined();
        });

        it('should get user data by username', function(){

          $httpBackend.expect('GET', baseUrl + '/api/user/x/' + mockResponse.username).respond(200,mockResponse);
          User.getUser(mockResponse.username).then(function(resp){
            expect(resp.username).toEqual(mockResponse.username);
            expect(resp.beltColor).toEqual(mockResponse.beltColor);
          });
          $httpBackend.flush();
        });
    });

    describe('editProfile()', function(){

        it('should exist', function(){
          expect(User.editProfile).toBeDefined();
        });

        it('should edit user profile data', function(){

          var edited = {
            'username' : 'Plmoha492',
            'emai' : 'mohammad@gmail.com',
            'firstName' : 'mohammad',
            'lastName' : 'Ali Clai',
            'beltColor' : 'purple',
            'club' : 'Makhai',
            'country' : 'Jordan'
          };

          $httpBackend.expect('POST', baseUrl + '/api/user/editProfile').respond(201, edited);
          User.editProfile(mockResponse.username).then(function(resp){
            expect(resp.username).toEqual(mockResponse.username);
            expect(resp.firstName).not.toEqual(mockResponse.username);
          });
          $httpBackend.flush();
        });
    });

    describe('deleteUser()', function(){

        it('should exist', function(){
          expect(User.deleteUser).toBeDefined();
        });

        it('should be able to remove a user by username', function(){

          $httpBackend.expect('POST', baseUrl + '/api/user/delete').respond(201, 'User Deleted');
          User.deleteUser(mockResponse.username).then(function(resp){
            expect(resp).toEqual('User Deleted');
          });
          $httpBackend.flush();
        });
    });

    describe('getAllUsers()', function(){

      var usersArray = [
                  {
                    "username": "mihyar",
                    "email": "mihyar@gmail.com",
                    "firstName": "Mohammad",
                    "lastName": "Albakri",
                    "club": "fit",
                    "beltColor": "purple",
                    "country": "Jordan"
                  },
                  {
                    "username": "mohammad",
                    "email": "mohammad@gmail.com",
                    "firstName": "Gisela",
                    "lastName": "RBK",
                    "club": "Makhai",
                    "beltColor": "purple",
                    "country": "Jordan"
                  }];
        
        it('should exist', function(){
          expect(User.getAllUsers).toBeDefined();
        });

        it('should return an array of all the users', function(){

          $httpBackend.expect('GET', baseUrl + '/api/users').respond(200, usersArray);
          User.getAllUsers().then(function(resp){
            expect(resp.data).toEqual(usersArray);
          });
          $httpBackend.flush();
        });
    });
  });
/////////////////////////////// Tournament tests ////////////////////////////
  describe('Tournament factory', function(){
    var $httpBackend, Tournament;

    var mockResponse = {
                      "name": "test",
                      "Date": "21/6/2016",
                      "place": "ReBootKamp",
                      "organizer": "RBK2",
                      "details": "This is a tournament hosted by RBK"
                    };

    beforeEach(inject(function(_$httpBackend_, _Tournament_){
      $httpBackend = _$httpBackend_;
      Tournament = _Tournament_;
    }));

      it('should exist', function(){
        expect(Tournament).toBeDefined();
      });

    describe('AddTournament()', function(){

      it('should exist', function(){
        expect(Tournament.AddTournament).toBeDefined();
      });

      it('should be able to add new tournament', function(){

        $httpBackend.expect('POST', baseUrl + '/api/tournament/create').respond(201,mockResponse);
        Tournament.AddTournament(mockResponse).then(function(resp){
          expect(resp.data).toEqual(mockResponse);
        });
        $httpBackend.flush();
      });
    });

    describe('getAllTournament()', function(){

      it('should exist', function(){
        expect(Tournament.getAllTournament).toBeDefined();
      });

      it('Should return an array of all tournaments', function(){

        var tournamentsArray = [
                                {
                                  "name": "test",
                                  "place": "ReBootKamp",
                                  "organizer": "RBK2",
                                  "details": "This is a tournament hosted by RBK"
                                },
                                {
                                  "name": "dsaf",
                                  "place": "jordan",
                                  "organizer": "ww",
                                  "details": "jordan"
                                }];

        $httpBackend.expect('GET', baseUrl + '/api/tournament/tournaments').respond(200,tournamentsArray);
        Tournament.getAllTournament().then(function(resp){
          expect(resp).toEqual(tournamentsArray);
        });
        $httpBackend.flush();
      });
    });

    describe('SearchAboutTournament()', function(){

        it('should exist', function(){
          expect(Tournament.SearchAboutTournament).toBeDefined();
        });

        it('should be able to search for a tournament', function(){
          $httpBackend.expect('GET', baseUrl + '/api/tournament/x/'+ mockResponse.name).respond(200,mockResponse);
          Tournament.SearchAboutTournament(mockResponse.name).then(function(resp){
            expect(resp.data).toEqual(mockResponse);
          });
          $httpBackend.flush();
        });
    });

    describe('EditTournament()', function(){

        it('should exist', function(){
          expect(Tournament.EditTournament).toBeDefined();
        });

        it('should be able to edit already exists tournament', function(){
          var edited = {
                      "name": "test",
                      "place": "ReBootKamp",
                      "organizer": "RBK",
                      "details": "This is a tournament hosted by RBK"
                    };

          $httpBackend.expect('POST', baseUrl + '/api/tournament/edit').respond(201,edited);
          Tournament.EditTournament(mockResponse.name).then(function(resp){
            expect(resp.name).toEqual(edited.name);
            expect(resp.organizer).not.toEqual(mockResponse.organizer);
          });
          $httpBackend.flush();
        });
    })
  });
});