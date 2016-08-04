process.env.NODE_ENV = 'test';
var expect = require ('chai').expect;
var path = require('path')
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);

var Admin = require('../../server/Admin/adminModel');
var User = require('../../server/User/userModel');
var Club = require('../../server/Club/clubModel');
var userController = require('../../server/User/userController');
var clubController = require('../../server/Club/clubController');



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
			testAdmin.save(function(error,data){	
				 chai.request(server)
				 		.get('/api/admin/x/'+ data.username)
						.set('Accept','application/json')
						.end(function(err, res){
							expect(res.status).to.be.equal(200);
							expect(res.body).to.have.property('username');
							expect(res.body.username).to.not.equal(null);
							expect(res.body.username).to.be.equal('super');
							expect(res.body.password).to.be.equal(undefined);
							expect(res.body).to.have.property('firstName');
							expect(res.body.firstName).to.not.equal(null);
							expect(res.body).to.have.property('lastName');
							expect(res.body.lastName).to.not.equal(null);
							expect(res.body).to.have.property('email');
							expect(res.body.email).to.not.equal(null);
							done();
						});
			})
		});


		it('should fail when sending wrong username' , function(done){
			var testAdmin = new Admin({
				'username' : 'super',
			    'password' : '123', 
			    'firstName' : 'Iron' ,
			    'lastName' : 'Man',
			    'email' : 'ironman@avengers.com'
			});
			chai.request(server)
				   .get('/api/admin/x/dont' )
				   .set('Accept' , 'application/json')
				   .end(function(err,res){
				   		expect(res.status).to.be.equal(500);
				   		done();
				   })
		})

		it('should add admin with response 201 OK' , function(done){
			chai.request(server)
				.post('/api/admin/create')
				.send({
						'username' : 'RebootKamp',
					    'password' : '123', 
					    'firstName' : 'testing' ,
					    'lastName' : 'noneOfYourBusiness',
					    'email' : 'notGonnaTellYou'
					})
				.end(function(err,res){
					expect(res.status).to.be.equal(201);
					expect(res.body.username).to.be.equal('RebootKamp');
					expect(res.body.password).to.be.equal(undefined);
					expect(res.body.firstName).to.be.equal('testing');
					expect(res.body.lastName).to.be.equal('noneOfYourBusiness');
					expect(res.body.email).to.be.equal('notGonnaTellYou');
					done();
				});
		});

		it('should fail when missing username key' , function(done){
			chai.request(server)
				.post('/api/admin/create')
				.send({
					'password' : 'test' ,
					'email' : 'blaBla'
				})
				.end(function(err,res){
					expect(res.status).to.be.equal(500);
					done();
				})
		})

		it('should fail when creating an existing admin', function(done){
			chai.request(server)
				.post('/api/admin/create')
				.send({
					'username' : 'admin-memf',
				    'password' : '123', 
				    'firstName' : 'testing' ,
				    'lastName' : 'noneOfYourBusiness',
				    'email' : 'notGonnaTellYou'
				})
				.end(function(err ,res){
					expect(res.status).to.be.equal(500);
					done();
				})
		})
	});