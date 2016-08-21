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

        $httpBackend.expect('POST', baseUrl + '/api/user/signup').respond({status:201,data:mockResponse});

        Auth.signup().then(function (resp) {
          expect(resp.data.username[0]).toEqual('P');
          expect(resp.data.username[1]).toEqual('l');
          expect(resp.status).toEqual(201);
        });
        $httpBackend.flush();
      });
    });

  describe('signin()', function(){

      it('should exist', function(){
        expect(Auth.signin).toBeDefined();
      });

      it('should return token when a user signin', function(){
        $httpBackend.expect('POST', baseUrl + '/api/user/signin').respond({status:200,data:{token:token}});
        Auth.signin().then(function(resp){
        // expect(resp.token).toEqual(token);
        expect(resp.data.token).toEqual(token);
        expect(resp.status).toEqual(200);
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
          $httpBackend.expect('POST', baseUrl + '/api/admin/signin').respond({status:200,data:{token:token}});
          Admin.signin().then(function(resp){
          expect(resp.data.token).toEqual(token);
          expect(resp.status).toEqual(200);
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
          $httpBackend.expect('POST', baseUrl + '/api/admin/create').respond({status:201,data:mockAdmin});
          Admin.signup().then(function(resp){
            expect(resp.data.username).toEqual(mockAdmin.username);
            expect(resp.data.password).toEqual(undefined);
            expect(resp.data.email).toEqual(mockAdmin.email);
            expect(resp.status).toEqual(201);
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

          $httpBackend.expect('GET', baseUrl + '/api/admin/admins').respond({status:200,data:mockResponse});
          Admin.getAdmins().then(function(resp){
            expect(resp.data[0].username).toEqual(mockResponse[0].username);
            expect(resp.data[1].username).toEqual(mockResponse[1].username);
            expect(resp.status).toEqual(200);
          });
          $httpBackend.flush();
        });
    });
    describe('deleteAdmin()',function(){

        it('should exist', function(){
          expect(Admin.deleteAdmin).toBeDefined();
        });

        it('should remove existing admin 201(Success)', function(){
          $httpBackend.expect('POST', baseUrl + '/api/admin/delete').respond({status:201,data:'Admin Deleted'});
          Admin.deleteAdmin(mockResponse[0].username).then(function(resp){
            expect(resp.data).toEqual('Admin Deleted');
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });
  });
////////////////////////Club factory tests //////////////////////////////
  describe('Club factory', function(){
    var $httpBackend, Club, $window;
    var mockResponse = 
          {
            'username':'Plmiha492',
            'firstName' : 'Mihyar',
            'lastName' : 'almaslama',
            'country' : 'Syria',
            'email' : 'mihyar@gmail.com', 
            'clubName' : 'Makhai'
          };

    beforeEach(inject(function(_$httpBackend_, _Club_, _$window_){
      $httpBackend = _$httpBackend_;
      Club = _Club_;
      $window = _$window_;
    }));

    it('should exist', function(){
      expect(Club).toBeDefined();
    });

  describe('AddUser()', function(){

    it('should exist', function(){
      expect(Club.AddUser).toBeDefined();
    });

    it('should be able to register new users to a club 201(Success)', function(){

      $httpBackend.expect('POST', baseUrl + '/api/user/signup').respond({status:201,data:mockResponse});
      Club.AddUser(mockResponse).then(function(resp){
        expect(resp.data.password).toEqual(undefined);
        expect(resp.data.username[0]).toEqual('P');
        expect(resp.data.username[1]).toEqual('l');
        expect(resp.data.clubName).toEqual(mockResponse.clubName);
        expect(resp.status).toEqual(201);
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

        $httpBackend.expect('GET', baseUrl + '/api/club/x/'+username).respond({status:200, data:mockResponse});
        Club.getClub(username).then(function(resp){
          expect(resp.data.username).toEqual(mockResponse.username);
          expect(resp.status).toEqual(200);
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
        expect(resp.status).toEqual(200);
      });
      $httpBackend.flush();
    });
  });

  describe('Addclub', function(){

      it('should exist', function(){
        expect(Club.Addclub).toBeDefined();
      });

      it('should be able to add a new club', function(){

        $httpBackend.expect('POST', baseUrl + '/api/club/register').respond({status:201,data:mockResponse});
        Club.Addclub(mockResponse).then(function(resp){
          expect(resp.data.clubName).toEqual(mockResponse.clubName);
          expect(resp.status).toEqual(201);
        });
        $httpBackend.flush();
      });
  });

  describe('removeClub()', function(){
      
      it('should exist', function(){
        expect(Club.removeClub).toBeDefined();
      });

      it('should be able to remove a club give a clubName', function(){

        $httpBackend.expect('POST', baseUrl + '/api/club/delete').respond({status:201, data:'Club Deleted'});
        Club.removeClub(mockResponse.clubName).then(function(resp){
            expect(resp.data).toEqual('Club Deleted');
            expect(resp.status).toEqual(201);
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
                'country' : 'Canada',
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

            $httpBackend.expect('GET', baseUrl + '/api/clubs').respond({status:200,data:mockClubs});
            Club.getClubs().then(function(resp){
              expect(resp.data).toEqual(mockClubs);
              expect(resp.status).toEqual(200);
            });
          $httpBackend.flush();
        });
      });

  describe('editClub()', function(){

        it('should exists', function(){
          expect(Club.editClub).toBeDefined();
        });

        it('should be able to edit existing club', function(){

          var mockClubs = {
                'username':'Clmiha492',
                'firstName' : 'Mihyar',
                'lastName' : 'almaslama',
                'country' : 'Canada',
                'email' : 'mihyar@gmail.com', 
                'clubName' : 'Makhai'
              };

          $httpBackend.expect('POST', baseUrl + '/api/club/editProfile').respond({status:201, data:mockClubs});
          Club.editClub(mockResponse).then(function(resp){
            expect(resp.data.username).toEqual(mockClubs.username);
            expect(resp.data).not.toEqual(mockResponse);
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });

  describe('getClubUsers()', function(){

        it('should exist', function(){
          expect(Club.getClubUsers).toBeDefined();
        });

        it('should get all users of a certain club', function(){

          var usersArray = [
                  {
                    "username": "mihyar",
                    "email": "mihyar@gmail.com",
                    "firstName": "Mohammad",
                    "lastName": "Albakri",
                    "club": "Makhai",
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

          $httpBackend.expect('GET', baseUrl + '/api/users/clubUsers/' + mockResponse.clubName).respond(200,usersArray);
          Club.getClubUsers(mockResponse.clubName).then(function(resp){
            expect(resp.data[0].clubName).toEqual(mockResponse.club);
            expect(resp.data[1].clubName).toEqual(mockResponse.club);
            expect(resp.status).toEqual(200);
          });
          $httpBackend.flush();
        });
      });

  describe('signout()', function(){

        it('should exist', function(){
            expect(Club.signout).toBeDefined();
        });

        it('should clear localStorage when logs out', function(){
            $window.localStorage.setItem('com.zarad',token);
            Club.signout();
            expect($window.localStorage.getItem('com.zarad')).toEqual(null);
        });
    });
  });
//////////////////////////////// User factory ////////////////////////
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
            expect(resp.data.username).toEqual(mockResponse.username);
            expect(resp.data.beltColor).toEqual(mockResponse.beltColor);
            expect(resp.status).toEqual(200);
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

          $httpBackend.expect('POST', baseUrl + '/api/user/editProfile').respond({status:201, data:edited});
          User.editProfile(mockResponse.username).then(function(resp){
            expect(resp.data.username).toEqual(mockResponse.username);
            expect(resp.data.firstName).not.toEqual(mockResponse.username);
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });

    describe('updateGoal()', function(){

        it('should exists', function(){
          expect(User.updateGoal).toBeDefined();
        });

        it('should insert new goals and delete existing goals', function(){
          var goalId=1;

          $httpBackend.expect('POST', baseUrl + '/api/user/goals').respond(201,'Goal Updated');
          User.updateGoal(goalId).then(function(resp){
            expect(resp.data).toEqual('Goal Updated');
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });

    describe('deleteUser()', function(){

        it('should exist', function(){
          expect(User.deleteUser).toBeDefined();
        });

        it('should be able to remove a user by username', function(){

          $httpBackend.expect('POST', baseUrl + '/api/user/delete').respond({status:201, data:'User Deleted'});
          User.deleteUser(mockResponse.username).then(function(resp){
            expect(resp.data).toEqual('User Deleted');
            expect(resp.status).toEqual(201);
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
            expect(resp.status).toEqual(200);
          });
          $httpBackend.flush();
        });
    });

    describe('resub()', function(){

        it('should exists', function(){
          expect(User.resub).toBeDefined;
        });

        it('should be able to renew user subscription', function(){

          $httpBackend.expect('POST', baseUrl + '/api/user/resub').respond({status: 201, data: 'subscription renewed'});
          User.resub(mockResponse.username).then(function(resp){
            expect(resp.data).toEqual('subscription renewed');
            expect(resp.status).toEqual(201);
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
          expect(resp.status).toEqual(201);
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

        $httpBackend.expect('GET', baseUrl + '/api/tournament/tournaments').respond({status:200,data:tournamentsArray});
        Tournament.getAllTournament().then(function(resp){
          expect(resp.data).toEqual(tournamentsArray);
          expect(resp.status).toEqual(200);
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
            expect(resp.status).toEqual(200);
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

          $httpBackend.expect('POST', baseUrl + '/api/tournament/edit').respond({status:201,data: edited});
          Tournament.EditTournament(mockResponse.name).then(function(resp){
            expect(resp.data.name).toEqual(edited.name);
            expect(resp.data.organizer).not.toEqual(mockResponse.organizer);
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });

    describe('DeleteTournament()', function(){

        it('should exist', function(){
          expect(Tournament.DeleteTournament).toBeDefined();
        });

        it('should delete existing tournament', function(){

          $httpBackend.expect('POST', baseUrl + '/api/tournament/delete').respond({status:201,data:'Tournament Deleted'});
          Tournament.DeleteTournament(mockResponse.name).then(function(resp){
            expect(resp.data).toEqual('Tournament Deleted');
            expect(resp.status).toEqual(201);
          });
          $httpBackend.flush();
        });
    });
  });
/////////////////////////////////////// Quotes Tests ///////////////////////////////
    describe('Quotes factory', function(){
        var $httpBackend, Quotes;
        
        beforeEach(inject(function(_$httpBackend_, _Quotes_){
          $httpBackend = _$httpBackend_;
          Quotes = _Quotes_;
        }));

        it('should exists', function(){
          expect(Quotes).toBeDefined();
        });

        describe('getQuotes()', function(){
          var mockResponse = [
                        {
                          "_id": "57b7dd13209d2b0300367c1a",
                          "image": "http://67.media.tumblr.com/bba1e0bab577e738d063041af9d999f8/tumblr_o2eo50NrAR1ts2km8o1_500.jpg"
                        },
                        {
                          "_id": "57b7e277209d2b0300367c1b",
                          "image": "http://4.bp.blogspot.com/-PnY8eaR7y0E/VMUftUyaqLI/AAAAAAAAANY/rV5M6CarTJw/s1600/joe_rogan_bjj_black_belt.png"
                        },
                        {
                          "_id": "57b7e2e0209d2b0300367c1c",
                          "image": "http://i1277.photobucket.com/albums/y482/colo56/JiuJitsu/tumblr_m72oy1pknb1r39lqlo1_500_zps9f1ac09b.jpg"
                        }];

          it('should exists', function(){
            expect(Quotes.getQuotes).toBeDefined();
          });

          it('should be able to fetch all Quotes', function(){

            $httpBackend.expect('GET', baseUrl + '/api/quotes/get').respond({status:200, data: mockResponse});
            Quotes.getQuotes().then(function(resp){
              expect(resp.status).toEqual(200);
              expect(resp.data[0].image).toEqual(mockResponse[0].image);
            });
            $httpBackend.flush();
          });
        })
    })
});