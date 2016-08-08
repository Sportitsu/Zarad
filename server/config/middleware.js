'use strict';
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../www'));
  app.use(function(req,res,next){
        var _send = res.send;
        var sent = false;
        res.send = function(data){
            if(sent) {return;}
            _send.bind(res)(data);
            sent = true;
        };
        next();
    });
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});
};