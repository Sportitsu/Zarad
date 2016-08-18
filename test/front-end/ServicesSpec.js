'use strict';

describe('AuthController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('zarad'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('com.zarad');
  });

      it('should exist', function(){
      expect(Auth).to.exist;
    });

    it('should have a method signup', function(){
      expect(Auth.signup).to.be.a('function')
    });

    it('should have a method signin', function(){
      expect(Auth.signin).to.be.a('function')
    });

    it('should have a method signout', function(){
      expect(Auth.signout).to.be.a('function')
    });

    it('should have a method isAuth', function(){
      expect(Auth.isAuth).to.be.a('function')
    });

    it('should have a method checkUser', function(){
      expect(Auth.checkUser).to.be.a('function')
    });

})

//======================================



//======================================
// describe('Services', function () {
// beforeEach(module('zarad'));

//   afterEach(inject(function ($httpBackend) {
//     // $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//   }));

//   describe('Factory', function () {
//   var $httpBackend, Admin;

//    beforeEach(inject(function (_$httpBackend_, _Admin_, _Club_, _Tournament_, _User_, _Auth_, _$window_) {
//       $httpBackend = _$httpBackend_;
//       Admin = _Admin_;
//       Club = _Club_;
//       Tournament = _Tournament_;
//       User = _User_;
//       Auth = _Auth_;
//       $window = _$window_;
//     }));

//    it('should exist', function () {
//       expect(Admin).to.exist;
//     });

//    it('should have a method `Addclub`', function () {
//       expect(Club.Addclub).to.be.a('function');
//     });

//   it('should add a new club with `Addclub`', function () {
//       var club = {
//         username:1,
//         password:"1111",
//         country:"jordan",
//         clubName: "zarad jordan" };

//       $httpBackend
//         .expect('POST','http://zarad.herokuapp.com/api/club/register')
//         .respond(201, {
//         username:1,
//         password:"1111",
//         country:'jordan',
//         clubName: "zarad jordan"
//         });
      
//       Club.Addclub(club).then(function (resp) {
//         expect(resp.status).to.equal(201);
//         expect(resp.data.clubName).to.equal("zarad jordan");
//       });
//     });

//     // test Addtournament 
//    it('should have a method `AddTournament`', function () {
//       expect(Tournament.AddTournament).to.be.a('function');
//     });

//   it('should add a new tournament with `AddTournament`', function () {
//       var tournament  = {
//         name:"cup",
//         Date:"1111",
//         place:"jordan",
//         organizer: "zarad jordan",
//         details:" jejestu cup in jordan" ,
//         poster:"tournament.gpj"
//     };

//       $httpBackend
//         .expect('POST','http://zarad.herokuapp.com/api/tournament/create')
//         .respond(201, {
//         name:"cup",
//         Date:"1111",
//         place:"jordan",
//         organizer: "zarad jordan",
//         details:" jejestu cup in jordan" ,
//         poster:"tournament.gpj"
//         });

//       Tournament.AddTournament(tournament ).then(function (resp) {
//         expect(resp.status).to.equal(201);
//         expect(resp.name).to.equal('cup');
//       });
//     });
//   ///////////////////////////////
//    it('User should exist', function () {
//       expect(User).to.exist;
//     });

//    it('Club should have a method `getClub`', function () {
//       expect(Club.getClub).to.be.a('function');
//     });

//     it('should get club with `getClub`', function () {
//        var club = {
//         username:1,
//         password:"1111",
//         country:"jordan",
//         clubName: "zarad jordan" };

//       $httpBackend.expect('GET', 'http://zarad.herokuapp.com/api/club/x/1').respond(club);

//       Club.getClub(1).then(function (club) {
//         expect(club.data).to.deep.equal(club);
//       });
//     });
//   ///////////////////////////////
//     it('should exist', function () {
//       expect(Auth.signup).to.be.a('function');
//     });

//     it('should signup a new user', function () {
//       var user = {
//         password : 'test',
//         country : 'Syria',
//         beltColor : 'purple',
//         club : 'Makhai',
//         membership   : 1,
//         firstName : "mihyar",
//         email : "mihyar@gmail.com"
//       };
//       $httpBackend.expect('POST','http://zarad.herokuapp.com/api/signup').respond(201, user);
//       Auth.signup(user)

//     });  
      
//       it('should be able to signin', function(){
//         var user = {
//           username : 'Plmoha492',
//           password : 'test'
//         }
//         $httpBackend.expectPOST('http://zarad.herokuapp.com/api/user/signin').respond(user);
//         Auth.signin()
//       })

//   });
// });