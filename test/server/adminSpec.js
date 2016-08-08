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
		var testAdmin;
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
			testAdmin = new Admin({
				'username' : 'super',
			    'password' : '123', 
			    'firstName' : 'Iron' ,
			    'lastName' : 'Man',
			    'email' : 'ironman@avengers.com'
			});

		});

		afterEach(function(done){
		    Admin.collection.drop();
			done();
		});

		var getAdmin = function(get, expectation){
			chai.request(server)
				 		.get(get)
						.set('Accept','application/json')
						.end(expectation);
		}

		it('should be an object with keys and values', function(done){
			testAdmin.save(function(error,data){	
				 getAdmin('/api/admin/x/' + data.username, function(err,res){
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
				 })
			})
		});


		it('should fail when sending wrong username' , function(done){
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
		});

		it('should signin user when keys are passed correctly', function(done){
			var newAdmin = new Admin({
				'username' : 'Admin' , 
				'password' : 'adminto',
				'firstName' : 'Mohammad',
				'lastName' : 'Albakri' ,
				'email' : 'mohammad.albakri93@gmail.com'
			})
			newAdmin.save();

			chai.request(server)
				.post('/api/admin/signin')
				.send({
				 'username'	: 'Admin',
				 'password'	: 'adminto'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('token');
					expect(typeof res.body.token).to.be.equal('string');
					done();
				})
		});

		it('should return an error when passing the wrong username', function(done){
			chai.request(server)
				.post('/api/admin/signin')
				.send({
					'username' : 'admin' , 
					'password' : 'adminto',

				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					expect(Object.keys(res.body).length).to.be.equal(0);
					done();
				})
		});

		it('should return an error when passing wrong password', function(done){
			var newAdmin = new Admin({
				'username' : 'Admin' , 
				'password' : 'adminto',
				'firstName' : 'Mohammad',
				'lastName' : 'Albakri' ,
				'email' : 'mohammad.albakri93@gmail.com'
			})
			newAdmin.save();
			chai.request(server)
				.post('/api/admin/signin')
				.send({
					'username' : 'Admin', 
					'password' : 'None'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		});

		it('should delete admin when given a user name', function (done) {
			chai.request(server)
				.post('/api/admin/delete')
				.send({
					"username" : "admin-memf"
				})
				.end(function (err,res) {
					expect(res.status).to.be.equal(201);
					chai.request(server)
						.get('/api/admin/x/admin-memf')
						.end(function (err,res) {
							expect(res.status).to.be.equal(500);
							expect(res.body.username).to.be.equal(undefined);
							done();
						})
				})
		});

		it('should return error when given wrong admin name', function (done){
			chai.request(server)
				.post('/api/admin/delete')
				.send({
					"username" : "klajhdhdkj"
				})
				.end(function (err,res) {
					expect(res.status).to.be.equal(500);
					done();
				});
		});

		it('shuold get all admins', function(done){
			chai.request(server)
				.get('/api/admin/admins')
				.end(function (err,res) {
					expect(res.status).to.be.equal(200);
					expect(res.body.length).to.not.be.equal(0);
					done();
				})
		})

		it('should return 500 when there is no admins', function(done){
			Admin.collection.drop();
			chai.request(server)
				.get('/api/admin/admins')
				.end(function (err,res) {
					expect(res.status).to.be.equal(500);
					expect(Object.keys(res.body).length).to.be.equal(0);
					done();
				})
		})

	});