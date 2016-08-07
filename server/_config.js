var config = {};

config.mongoURI = {
	development : process.env.MONGODB_URI || 'mongodb://localhost/zarad' ,
	test : process.env.MONGODB_URI || 'mongodb://localhost/node-test'
};

module.exports = config;