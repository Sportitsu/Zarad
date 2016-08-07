var config = {};

config.mongoURI = {
	development : process.env.MONGODB_URI || 'mongodb://localhost/zarad' ,
	test : 'mongodb://localhost/node-test'
};

module.exports = config;