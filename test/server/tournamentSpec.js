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
var Tournament = require('../../server/Tournament/tournamentModel');
var userController = require('../../server/User/userController');
var clubController = require('../../server/Club/clubController');


describe('Tournaments DataBase', function(done){
	beforeEach(function(done){
		var newTour = new Tournament ({
			'name' : 'AbuDhabi-2014-World-Pro' ,
			'Date' : 'Next Tuesday' , 
			'place' : 'Abu-Dhabi Arena Club' , 
			'organizer' : 'UAEJJF' , 
			'details' : 'xxxx\nxxxx' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla'
		})
		newTour.save(function(err ,saved){
			if(saved){
				done();
			}
		})
	})
	afterEach(function(done){
		Tournament.collection.drop();
		done();
	});

	it('should get all Tournaments in database' , function(done){
		chai.request(server)
			.get('/api/tournament/tournaments')
			.end(function(err, res){
				expect(res.status).to.be.equal(200);
				expect(res.body.length).to.be.equal(1);
				expect(res.body[0].organizer).to.be.equal('UAEJJF');
				expect(res.body[0]).to.have.property('name');
				done();
			})
	});

	it('should handle error when there are no tournaments in database', function(done){
		Tournament.collection.drop();
		chai.request(server)
			.get('/api/tournament/tournaments')
			.end(function(err ,res){
				expect(res.body.length).to.be.equal(undefined);
				expect(res.status).to.be.equal(500);
				expect(res.body.name).to.be.equal(undefined);
				expect(res.body.place).to.be.equal(undefined);
				expect(res.body.organizer).to.be.equal(undefined);
				done();
			})
	});

	it('should add tournament when passing the right keys' ,function(done){
		chai.request(server)
			.post('/api/tournament/create')
			.send({
				'name' : 'San Fransisco Elite Tournament' ,
				'Date' : 'Test' , 
				'place' : 'Boo' , 
				'organizer' : 'Bla' , 
				'details' : 'sdfl' ,
				'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla'
			})
			.end(function(err ,res){
				expect(res.status).to.be.equal(201);
				expect(res.body.name).to.be.equal('San Fransisco Elite Tournament');
				expect(res.body.details).to.be.equal('sdfl');
				done();
			});
	});

	it('should handle error when not passing all required keys', function(done){
		chai.request(server)
			.post('/api/tournament/create')
			.send({
				'name' : 'Not Gonna Work This Time 2016'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should get a tournament details when called on it', function(done){
		chai.request(server)
			.get('/api/tournament/x/AbuDhabi-2014-World-Pro')
			.end(function(err, res){
				expect(res.status).to.be.equal(200);
				done();
			})
	});

	it('should handle errors when passing non-existing tournament', function(done){
		chai.request(server)
			.get('/api/tournament/x/notgonnatellya')
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should delete a tournament when passed the right name key', function(done){
		var newTour = new Tournament({
			'name' : 'San Fransisco Elite Tournament' ,
			'Date' : 'Test' , 
			'place' : 'Boo' , 
			'organizer' : 'Bla' , 
			'details' : 'sdfl' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla'
		})
		newTour.save(function(err , savedTour){
			chai.request(server)
				.post('/api/tournament/delete')
				.send({
					'name' : savedTour.name
				})
				.end(function(err ,res){
					expect(res.status).to.be.equal(201);
					done();
				})
		})
	});

	it('should handle error when passing wrong name for deletion', function(done){
		chai.request(server)
			.post('/api/tournament/delete')
			.send({
				'name' : '2349'
			})
			.end(function(err , res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should handle errors when editing wrong tournament', function(done){
		chai.request(server)
			.post('/api/tournament/edit')
			.send({
				'id' : '12393'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should edit tournament when passed the right name key', function(done){
		var newTour = new Tournament({
			'name' : 'San Fransisco Elite Tournament' ,
			'Date' : 'Test' , 
			'place' : 'Boo' , 
			'organizer' : 'Bla' , 
			'details' : 'sdfl' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla'
		})
		newTour.save(function(err, savedTour){
			chai.request(server)
				.post('/api/tournament/edit')
				.send({
					'name' : 'San Fransisco Elite Tournament',
					'place' : 'RebootKamp'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					expect(res.body.place).to.be.equal('RebootKamp');
					expect(res.body).to.have.property('name');
					done();
				})
		})
	})
	//addLike
	it('should addLike to  tournament when passed the right name key,and username', function(done){
		var newTour = new Tournament({
			'name' : 'San Fransisco Elite Tournament' ,
			'Date' : 'Test' , 
			'place' : 'Boo' , 
			'organizer' : 'Bla' , 
			'details' : 'sdfl' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla',
			'like'    :[]
		})

		newTour.save(function(err, savedTour){
			chai.request(server)
				.post('/api/tournament/addLike')
				.send({
					'name' : 'San Fransisco Elite Tournament',
					'username' : 'PLelham2342'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					expect(res.body.like.length).to.be.equal(1);
					expect(res.body).to.have.property('name');
					done();
				})
		})
	})
	it('should addLike to  tournament when passed the right name key,and username', function(done){
		var newTour = new Tournament({
			'name' : 'San Fransisco Elite Tournament' ,
			'Date' : 'Test' , 
			'place' : 'Boo' , 
			'organizer' : 'Bla' , 
			'details' : 'sdfl' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla',
			'like'    :["PLelham2342"]
		})
	
		newTour.save(function(err, savedTour){
			chai.request(server)
				.post('/api/tournament/addLike')
				.send({
					'name' : 'San Fransisco Elite Tournament',
					'username' : 'PLelham2342'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(201);
					expect(res.body.like.length).to.be.equal(0);
					expect(res.body).to.have.property('name');
					done();
				})
		})
	})
	it('should delete Like from  tournament when passed the right name key,and username agin', function(done){
		var newTour = new Tournament({
			'name' : 'San Fransisco Elite Tournament' ,
			'Date' : 'Test' , 
			'place' : 'Boo' , 
			'organizer' : 'Bla' , 
			'details' : 'sdfl' ,
			'poster' : 'www.facebook.com/mohammadalbakri/image.jpg?=234?=lang=EN?&=blabla',
			'like'    :["PLelham2342"]
		})
	
		newTour.save(function(err, savedTour){
			chai.request(server)
				.post('/api/tournament/addLike')
				.send({
					'name' : 'San Fransisco Elite ',
					'username' : 'PLelham2342'
				})
				.end(function(err, res){
					expect(res.status).to.be.equal(500);
					done();
				})
		})
	})
});