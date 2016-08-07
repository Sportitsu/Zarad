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


describe('User Test Database', function(done){

	User.collection.drop();

	beforeEach(function(done){
		var newUser = new User({
			'username' : 'mohammad',
		    'password' : 'testing', 
		    'club' : 'DesertForce',
		    'country' : 'Jordan',
		    'beltColor' : 'Purple'
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
			'username' : 'testing',
		    'password' : '123', 
		    'firstName' : 'Iron' ,
		    'lastName' : 'Man',
		    'club' : 'Makhai',
		    'email' : 'ironman@avengers.com', 
		    'country' : 'Jordan',
		    'beltColor' : 'Purple'

		})
		newUser.save(function(error , newUser){
			chai.request(server)
				.get('/api/user/x/'+ newUser.username)
				.end(function(err, res){
					expect(res.status).to.be.equal(200);
					expect(res.body.username).to.be.equal('testing');
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
			var newClub = new Club({
				'username' : 'Mihyar' , 
				'password' : '1234' , 
				'clubName' : 'SourceMMA' , 
				'country'  : 'Jordan'
			})
			newClub.save();
			chai.request(server)
				.post('/api/user/signup')
				.send({
					'password' : 'fighting',
					'club' : 'SourceMMA',
					'country' : 'Jordan',
					'beltColor' : 'Green',
					'firstName' : 'fatima'
				})
				.end(function(err, res){
					console.log(res.body.username);
					expect(err).to.be.equal(null);
					expect(res.status).to.be.equal(201);
					expect(res.body.country).to.be.equal('Jordan');
					expect(res.body).to.have.property('username');
					expect(res.body).to.have.property('club');
					expect(res.body.club).to.be.equal('SourceMMA');
					expect(res.body).to.have.property('password');
					expect(res.body).to.have.property('country');
					expect(res.body).to.have.property('club');
					done();
				})
		});



		it('should return 500 Error if Club is not Found', function(done){
			chai.request(server)
				.post('/api/user/signup')
				.send({
					'password' : 'ahmad',
					'club' : 'makhai'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		});

		it('should return 500 Error if keys are not complete', function(done){
			var newClub = new Club({
				'username' : 'Mihyar' , 
				'password' : '1234' , 
				'clubName' : 'SourceMMA' , 
				'country'  : 'Jordan'
			})
			newClub.save();
			chai.request(server)
				.post('/api/user/signup')
				.send({
					'password' : 'testing' , 
					'club' : 'SourceMMA'
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
					findUser(done);
					expect(res.status).to.be.equal(201);
				});
				var findUser = function(done) { 
					User.findOne({username : 'mohammad'}).exec(function(err, user){
						expect(user).to.be.equal(null);
					})
				}
				chai.request(server)
					.get('/api/users')
					.end(function(err, res){
						expect(Object.keys(res.body).length).to.be.equal(0);
						done();
				})
		})
	});
});	