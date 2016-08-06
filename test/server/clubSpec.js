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
	});

	it('should respond with token key when user are correctly signed in', function(done){
		chai.request(server)
			.post('/api/club/signin')
			.send({
				'username' : 'fighterX' , 
				'password' : '1234' 
			})
			.end(function(err, res){
				expect(typeof res.header['x-access-token']).to.be.equal('string');
				expect(res.status).to.be.equal(200);
				done();
			});
	});

	it('should respond with error if username is not compatible with password', function(done){
		chai.request(server)
			.post('/api/club/signin')
			.send({
				'username' : 'fighterX' , 
				'password' : 'BlaBla' 
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should respond with an error if club username is incorrect', function(done){
		chai.request(server)
			.post('/api/club/signin')
			.send({
				'username' : 'PeterPan',
				'password' : 'really?'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should remove club when passed the right username', function(done){
		chai.request(server)
			.post('/api/club/delete')
			.send({
				'username' : 'fighterX'
			})
			.end(function(err, res){
				findClub();
				expect(res.status).to.be.equal(201);
			})
			var findClub = function(){
				Club.findOne({username : 'fighterX'}).exec(function(err, user){
					expect(user).to.be.equal(null);
					done();
				})
			}
	})

	it('should handle errors when pasing wrong username', function(done){
		chai.request(server)
			.post('/api/club/delete')
			.send({
				'username' : 'catchMe'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should handle errors when passing wrong Club to edit', function(done){
		chai.request(server)
			.post('/api/club/editProfile')
			.send({
				'username' : 'MaElak',
				'country' : 'Amman' ,
				'clubName' : 'SourceMMA'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should edit Club when passing right username and keys', function(done){
		chai.request(server)
			.post('/api/club/editProfile')
			.send({
				'username' : 'fighterX', 
				'country' : 'Amman'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(201);
				expect(res.body).to.have.property('country');
				expect(res.body).to.have.property('clubName');
				done();
			})
	});

	it('should handle error if requesting an existent clubName', function(done){
		var newClub = new Club({
			'username' : 'source' ,
			'password' : '123' , 
			'clubName' : 'source' ,
			'country' : 'Jordan'
		})
		newClub.save(function(err,saved){
			chai.request(server)
				.post('/api/club/editProfile')
				.send({
					'username' : saved.username,
					'newClubName' : 'Fight-X', 
					'country' : 'Amman'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		})
	});

	it('should update club with new name if is not existent between our clubs', function(done){
		var newClub = new Club({
			'username' : 'source',
			'password' : '1234',
			'clubName' : 'SourceMMA',
			'country'  : 'Jordan'
		})
		newClub.save(function(err,saved){
			chai.request(server)
				.post('/api/club/editProfile')
				.send({
					'username' : saved.username,
					'newClubName' : 'Makhai',
					'country' : 'Ordon'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					expect(res.body.clubName).to.be.equal('Makhai');
					expect(res.body.country).to.be.equal('Ordon');
					done();
				})
		})
	});


	it('should change password if oldPassword is passed in the body', function(done){
			chai.request(server)	
				.post('/api/club/editProfile')
				.send({
					'username' : 'fighterX' ,
					'oldPassword' : '1234' ,
					'password'  : 'passing'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					done();
				})
	});

		it('should return 500 ERROR if old Password is incorrect', function(done){
			chai.request(server)
				.post('/api/club/editProfile')
				.send({
					'username' : 'fighterX', 
					'oldPassword' : 'blabla', 
					'password' : 'testing'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
	})
})

