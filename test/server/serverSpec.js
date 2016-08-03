process.env.NODE_ENV = 'test';
var should = require('chai').should();
var expect = require ('chai').expect;
var path = require('path')
var supertest = require('supertest');
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      ,chaiHttp = require('chai-http');


chai.use(chaiHttp);
var Admin = require('../../server/Admin/adminModel');
var User = require('../../server/User/userModel');
var Club = require('../../server/Club/clubModel');
var userController = require('../../server/User/userController');
var clubController = require('../../server/Club/clubController');
var jwt = require('jwt-simple');
var request = supertest.agent(server);

describe("Integration Server Database test", function (){
	describe('/GET' , function(done){
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
			testAdmin.save(function(error,data){	
				 request.get('/api/admin/x/'+ data.username)
						.set('Accept','application/json')
						.expect(200)
						.end(function(err, res){
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
			request.get('/api/admin/x/dont' )
				   .set('Accept' , 'application/json')
				   .expect(500)
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

	describe('Club Test Database', function(done){
		Club.collection.drop();
		beforeEach(function(done){
			var newClub = new Club({
				'username' : 'fighterX' , 
				'password' : '1234' , 
				'clubName' : 'Fight-X',
				'country'  : 'Jordan'
			});
			newClub.save(function(err, savedClub){
				done();
			})
		});
		afterEach(function(done){
			Club.collection.drop();
			done();
		})
		it('should get all clubs' , function(done){
			chai.request(server)
				.get('/api/clubs')
				.end(function(err , res){
					expect(res.status).to.be.equal(200);
					expect(Array.isArray(res.body)).to.be.equal(true);
					expect(res.body.length).to.be.equal(1);
					done();
				})
		});

		it('should return error 500 when collection is empty', function(done){
			Club.collection.drop();
			chai.request(server)
				.get('/api/clubs')
				.end(function(err, res){
					expect(res.body.length).to.be.equal(undefined);
					expect(res.status).to.be.equal(500);
					done();
				})
		})

		it('should get a club upon passing username in params', function(done){
			chai.request(server)
				.get('/api/club/x/'+ 'fighterX')
				.end(function(err, res){
					expect(res.status).to.be.equal(200);
					done();
				})
		});
		
		it('should return error 500 when passing wrong username', function(done){
			chai.request(server)
				.get('/api/club/x/dontEnter')
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		});

		it('should add club when passing all required keys', function(done){
			chai.request(server)
				.post('/api/club/register')
				.send({
					'username' : '103948', 
					'password' : 'catchmeifyoucan',
					'clubName' : 'Desert-Force', 
					'country' : 'Jordan'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					expect(res.body).to.have.property('username');
					expect(res.body).to.have.property('clubName');
					expect(res.body).to.have.property('country');
					done();
				});
		})

		it('should respond with error 500 when user exists', function(done){
			var newClub = new Club({
					'username' : 'fighteX',
					'password' : 'iShouldNotWork',
					'clubName' : 'BlaBla' ,
					'country'  : 'Jordan'
			})
			newClub.save(function(err , savedClub){
				chai.request(server)
					.post('/api/club/register')
					.send({
						'username' : 'fighteX',
						'password' : 'iShouldNotWork',
						'clubName' : 'BlaBla' ,
						'country'  : 'Jordan'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						expect(res.body.username).to.be.equal(undefined);
						done();
					})
			})
		});

		it('should return error 500 if required keys are not supported', function(done){
			chai.request(server)
				.post('/api/club/register')
				.send({
					'username' : 'newClub',
					'password' : 'hmmmm'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		})
	})




	xdescribe('User Test Database', function(done){

		User.collection.drop();

		beforeEach(function(done){
			var newUser = new User({
				'username' : 'mohammad',
			    'password' : 'testing', 
			    'club' : 'DesertForce',
			    'country' : 'Jordan'
			});
			newUser.save(function(err,savedUser){
				done();

			})
		});
		afterEach(function(done){
		    User.collection.drop();
			done();
		});

		it('should get all users in database', function(done){
			chai.request(server)
				.get('/api/users')
				.end(function(err, res){
					expect(res.status).to.be.equal(200);
					expect(res.body.length).to.be.equal(1);
					expect(res.body[0].username).to.be.equal('mohammad');
					expect(res.body[0].password).to.be.equal(undefined);
					done();
				})
		});

		it('should return with status 500' , function(done){
			User.collection.drop();
			chai.request(server)
				.get('/api/users')
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					expect(res.body.length).to.be.equal(undefined);
					done();
				})
		})

		it('should get one user when username is passed in route' , function(done){
			var newUser = new User({
				'username' : 'super',
			    'password' : '123', 
			    'firstName' : 'Iron' ,
			    'lastName' : 'Man',
			    'club' : 'Makhai',
			    'email' : 'ironman@avengers.com', 
			    'country' : 'Jordan'
			})
			newUser.save(function(error , newUser){
				chai.request(server)
					.get('/api/user/x/'+ newUser.username)
					.end(function(err, res){
						expect(res.status).to.be.equal(200);
						expect(res.body.username).to.be.equal('super');
						expect(res.body).to.have.property('username');
						expect(res.body).to.have.property('firstName');
						expect(res.body).to.have.property('lastName');
						expect(res.body).to.have.property('email');
						done();
					})
				
			})
		})

		it('should respond with status 500 Error if user is not available', function(done){
			chai.request(server)
				.get('/api/user/x/dontenter')
				.end(function(err,res){
					expect(res.status).to.be.equal(500);
					done();
				})
		});

		describe('Signing up in User Controller' ,function(done){
			it('should have a method called signUp', function(done){
				expect(typeof userController.signup).to.be.equal('function');
				done();
			});

			it('return 500 if username already exists', function(done){
				chai.request(server)
					.post('/api/user/signup')
					.send({
						'username' : 'mohammad',
					    'password' : 'testing', 
					    'club' : 'DesertForce',
					    'country' : 'Jordan'
					})
					.end(function(req,res){
						expect(res.status).to.be.equal(500);
						done();
					})
			});

			it('should signup a new user', function(done){
				chai.request(server)
					.post('/api/user/signup')
					.send({
						'username' : 'Fighter',
						'password' : 'fighting',
						'club' : 'sourceMMA',
						'country' : 'Jordan'
					})
					.end(function(err, res){
						expect(err).to.be.equal(null);
						expect(res.body.country).to.be.equal('Jordan');
						expect(res.body).to.have.property('username');
						expect(res.body).to.have.property('password');
						expect(res.body).to.have.property('country');
						expect(res.body).to.have.property('club');
						done();
					})
			})

			it('should return 500 Error if you forgot to add required keys', function(done){
				chai.request(server)
					.post('/api/user/signup')
					.send({
						'username' : 'ahmad',
						'password' : 'ahmad',
						'club' : 'makhai'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						done();
					})
			})
		})


		describe('Sign in User', function(done){
			it('should have a method called singin', function(done){
				expect(typeof userController.signin).to.be.equal('function');
				done();
			});

			it('should response 500 ERROR if user is not available', function(done){
				chai.request(server)
					.post('/api/user/signin')
					.send({
						'username' :'amNotAvailable'
					})
					.end(function(err, res){
						expect(err).to.not.equal(null);
						expect(res.status).to.be.equal(500);
						done();
					})
			});

			it('should give access tokens when signin in', function(done){
				chai.request(server)
					.post('/api/user/signin')
					.send({
						'username' : 'mohammad', 
						'password' : 'testing'
					})
					.end(function(err, res){
						expect(res.body.token).to.not.equal(undefined);
						expect(res.body).to.have.property('token');
						done();
					})
			});

			it('should return 500 ERROR if password is incorrect', function(done){
				chai.request(server)
					.post('/api/user/signin')
					.send({
						'username' : 'mohammad', 
						'password' : 'notme'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						done();
					})
			})
			
		})


		describe('Editing User Profile' , function(done){
			it('should have a method called editProfile', function(done){
				expect(typeof userController.editProfile).to.be.equal('function');
				done();
			});

			it('should return error if user is not found' , function(done){
				chai.request(server)
					.post('/api/user/editProfile')
					.send({
						'username' : 'nothere',
						'password' : 'wrong' ,
						'club' : 'newClub'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						done();
					})
			});

			it('should update user with new attributes', function(done){
				chai.request(server)
					.post('/api/user/editProfile')
					.send({
						'username' : 'mohammad' ,
						'club' : 'UaeJJF'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(201);
						expect(res.body.club).to.be.equal('UaeJJF');
						expect(res.body.country).to.be.equal('Jordan');
						done();
					})
			});

			it('should change password if oldPassword is passed in the body', function(done){
				chai.request(server)	
					.post('/api/user/editProfile')
					.send({
						'username' : 'mohammad' ,
						'oldPassword' : 'testing' ,
						'password'  : 'passing'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(201);
						done();
					})
			});

			it('should return 500 ERROR if old Password is incorrect', function(done){
				chai.request(server)
					.post('/api/user/editProfile')
					.send({
						'username' : 'mohamamd', 
						'oldPassword' : 'blabla', 
						'password' : 'testing'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						done();
					})
			})
		});

		describe('Delete User' , function(done){
			it('should have a method called deleteUser', function(done){
				expect(typeof userController.deleteUser).to.be.equal('function');
				done();
			})

			it('should return with an error if username is not available', function(done){
				chai.request(server)
					.post('/api/user/delete')
					.send({
						'username' : 'notMe',
						'Password' : 'wrong'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(500);
						done();
					})
			})

			it('should delete user when given the an available username', function(done){
				chai.request(server)
					.post('/api/user/delete')
					.send({
						'username' : 'mohammad' ,
						'password' : 'testing'
					})
					.end(function(err, res){
						expect(res.status).to.be.equal(201);
					});

				chai.request(server)
					.get('/api/users')
					.end(function(err, res){
						expect(Object.keys(res.body).length).to.be.equal(0);
						done();
					})

			})
		});


		// TODO User Test Database
	});
	describe('Club Test Database', function(done){
		// TODO ClubTestDatabase 
	});
	describe('Tournaments DataBase', function(done){
		// TODO Tournaments Database
	});
});