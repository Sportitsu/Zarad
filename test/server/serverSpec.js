var expect = require ('chai').expect;
var path = require('path')
var supertest = require('supertest');
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      , chaiHttp = require('chai-http');

chai.use(chaiHttp);

var request = supertest.agent(server);


describe("Server", function (){

	describe('/GET' , function(done){
		it("should respond with status 200 OK when routing to /api/home ", function (done){
			chai.request(server)
				.get('/api/home')
				.end(function(err,res){
					expect(err).to.be.null;
					expect(res.status).to.be.equal(200);
					done();
			})
		});	
	});

	describe('/POST',  function(done){
		it('should respond with status 201 OK on route /api/admin' , function(done){
			chai.request(server)
				.post('/api/admin')
				.send({
						'username' : 'admin-memf',
					    'password' : '123'
					})
				.end(function(err,res){
					expect(err).to.be.null;
					expect(res.status).to.be.equal(201);
					done();
				})
		})
	})

});