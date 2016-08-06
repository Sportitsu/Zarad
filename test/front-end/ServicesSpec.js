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
        password:"1111",
        country:"jordan",
        clubName: "zarad jordan" };

      $httpBackend
        .expect('POST', '/api/clubregister')
        .respond(201, {
       
        password:"1111",
        country:'jordan',
        clubName: 'zarad jordan'
        });

      Admin.Addclub(club).then(function (resp) {
        expect(resp.status).to.equal(201);
        expect(resp.data.clubName).to.equal('zarad jordan');
      });

      $httpBackend.flush();
    });



})



})

