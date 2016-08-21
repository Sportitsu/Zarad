process.env.NODE_ENV = 'test';
var expect = require ('chai').expect;
var path = require('path')
var server = require(path.join(__dirname,'../../' ,'./server/server.js'));
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);

var Quote = require('../../server/Quotes/quotesModel');
var quotesController = require('../../server/Quotes/quotesController');
