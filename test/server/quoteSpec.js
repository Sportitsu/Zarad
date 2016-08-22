process.env.NODE_ENV = 'test';
var expect = require ('chai').expect;
var path = require('path')
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);

var Quote = require('../../server/Quotes/quotesModel');
var quotesController = require('../../server/Quotes/quotesController');


describe('Quote DataBase', function(done){
	beforeEach(function(done){
		var newQuote = new Quote ({
			'image' : 'ZaradQuote.jpg' 
		})
		newQuote.save(function(err ,saved){
			if(saved){
				done();
			}
		})
	})

	afterEach(function(done){
		Quote.collection.drop();
		done();
	});
	it('should get all quotes in database' , function(done){
		chai.request(server)
			.get('/api/quotes/get')
			.end(function(err, res){
				expect(res.status).to.be.equal(200);
				expect(res.body.length).to.be.equal(1);
				expect(res.body[0].image).to.be.equal('ZaradQuote.jpg');
				done();
			})
	});
	it('should handle error when there are no quote in database', function(done){
		Quote.collection.drop();
		chai.request(server)
			.get('/api/quotes/get')
			.end(function(err ,res){
				expect(res.body.length).to.be.equal(undefined);
				expect(res.status).to.be.equal(500);
				expect(res.body.image).to.be.equal(undefined);
				done();
			})
	});
	it('should get add new quotes to database' , function(done){
		chai.request(server)
			.post('/api/quotes/newquote')
			.send({
				'image' : 'ZaradQuote.jpg' 
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(201);
				expect(res.body.image).to.be.equal('ZaradQuote.jpg');
				done();
			})
	});
	




})

