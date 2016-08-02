var should = require('chai').should();
var expect = require ('chai').expect;
var path = require('path')
var supertest = require('supertest');
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      ,chaiHttp = require('chai-http');

chai.use(chaiHttp);
var Admin = require('../../server/Admin/adminModel');
var request = supertest.agent(server);


beforeEach(function(){
	// TODO FIND FAKE POSTS AND DELETE THEM FROM DATABASE. 
})

describe("Server", function (){
	xdescribe('/GET' , function(done){
		it("is just for testing mocha and chai ", function (done){
			chai.request(server)
				.get('/api/home')
				.end(function(err,res){
					expect(err).to.be.null;
					expect(res.status).to.be.equal(200);
					done();
			})
		});	
	});		
	describe('Admin Test Database', function(done){

		Admin.collection.drop();

		beforeEach(function(done){
			var newAdmin = new Admin({
				'username' : 'admin-memf',
			    'password' : '123', 
			    'firstName' : 'testing' ,
			    'lastName' : 'noneOfYourBusiness',
			    'email' : 'notGonnaTellYou'
			});
			newAdmin.save(function(err,savedUser){
				done();
			})
		});
		afterEach(function(done){
		    Admin.collection.drop();
			done();
		});
		it('should be an object with keys and values', function(done){
			var testAdmin = new Admin({
				'username' : 'super',
			    'password' : '123', 
			    'firstName' : 'Iron' ,
			    'lastName' : 'Man',
			    'email' : 'ironman@avengers.com'
			});
			testAdmin.save(function(err,data){	
				 request.get('/api/admin/'+ data.username)
						.set('Accept','application/json')
						.expect(200)
						.end(function(err, res){
							expect(res.body).to.have.property('username');
							expect(res.body.username).to.not.equal(null);
							expect(res.body.username).to.be.equal('super');
							expect(res.body.password).to.be.equal(null);
							expect(res.body).to.have.property('firstName');
							expect(res.body.firstName).to.not.equal(null);
							expect(res.body).to.have.property('lastName');
							expect(res.body.lastName).to.not.equal(null);
							expect(res.body).to.have.property('email');
							expect(res.body.email).to.not.equal(null);
							done();
						});
			})
		})

		it('should update admin with a new one with response 201 OK' , function(done){
			chai.request(server)
				.post('/api/admincreate')
				.send({
						'username' : 'admin-memf',
					    'password' : '123', 
					    'firstName' : 'testing' ,
					    'lastName' : 'noneOfYourBusiness',
					    'email' : 'notGonnaTellYou'
					})
				.end(function(err,res){
					console.log(res.body)
					expect(err).to.be.null;
					expect(res.status).to.be.equal(201);
					expect(res.body.username).to.be.equal('admin-memf');
					expect(res.body.password).to.be.equal(null);
					expect(res.body.firstName).to.be.equal('testing');
					expect(res.body.lastName).to.be.equal('noneOfYourBusiness');
					expect(res.body.email).to.be.equal('notGonnaTellYou');
					done();
				});
		});


	})
});