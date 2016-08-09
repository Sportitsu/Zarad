describe('Services', function () {
beforeEach(module('zarad'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('Admin Factory', function () {
	var $httpBackend, Admin;

	 beforeEach(inject(function (_$httpBackend_, _Admin_) {
      $httpBackend = _$httpBackend_;
      Admin = _Admin_;
    }));

	 it('should exist', function () {
      expect(Admin).to.exist;
    });

	 it('should have a method `Addclub`', function () {
      expect(Admin.Addclub).to.be.a('function');
    });

	it('should add a new club with `Addclub`', function () {
      var club = {
      	username:1,
        password:"1111",
        country:"jordan",
        clubName: "zarad jordan" };

      $httpBackend
        .expect('POST','/api/club/register')
        .respond(201, {
        username:1,
        password:"1111",
        country:'jordan',
        clubName: "zarad jordan"
        });
      

      Admin.Addclub(club).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data.clubName).to.equal("zarad jordan");
      });

      $httpBackend.flush();
    });


    // test Addtournament 
	 it('should have a method `Addtournament`', function () {
      expect(Admin.Addtournament).to.be.a('function');
    });

	it('should add a new tournament with `Addtournament`', function () {
      var tournament  = {
      	name:"cup",
        Date:"1111",
        place:"jordan",
        organizer: "zarad jordan",
        details:" jejestu cup in jordan" ,
        poster:"tournament.gpj"
    };

      $httpBackend
        .expect('POST','/api/tournament/create')
        .respond(201, {
      	name:"cup",
        Date:"1111",
        place:"jordan",
        organizer: "zarad jordan",
        details:" jejestu cup in jordan" ,
        poster:"tournament.gpj"
    
        });

      Admin.Addtournament(tournament ).then(function (resp) {
        //expect(resp.status).to.equal(201);
        expect(resp.name).to.equal('cup');
      });

      $httpBackend.flush();
    });
  });


  
 describe('Profile Factory', function () {
  var $httpBackend, Profile;

   beforeEach(inject(function (_$httpBackend_, _Profile_) {
      $httpBackend = _$httpBackend_;
      Profile = _Profile_;
    }));

   it('should exist', function () {
      expect(Profile).to.exist;
    });

   it('should have a method `getClub`', function () {
      expect(Profile.getClub).to.be.a('function');
    });

    it('should get club with `getClub`', function () {
       var club = {
        username:1,
        password:"1111",
        country:"jordan",
        clubName: "zarad jordan" };

      $httpBackend.expect('GET', '/api/club/x/1').respond(club);

      Profile.getClub(1).then(function (Profile) {
        expect(Profile.data).to.deep.equal(club);
      });

      $httpBackend.flush();
    });

  
  });


});

