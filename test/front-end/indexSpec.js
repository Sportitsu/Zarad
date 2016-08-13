
'use strict';

describe('Services',function(){
  var baseUrl = 'http://zarad.herokuapp.com';
  
  beforeEach(angular.mock.module('zarad.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('User Factory', function(){
    var $httpBackend, User;

    beforeEach(inject(function(_$httpBackend_, _User_) {
      User = _User_;
      $httpBackend = _$httpBackend_;
    }));

    it('User factory should exist', function() {
      expect(User).toBeDefined();
    });

    it('should exist', function() {
      expect(User.getUsersdfdf).toBeDefined();
    });

  })

});